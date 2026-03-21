const { put, head } = require('@vercel/blob');

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      try {
        const blob = await head('config/latest.json');
        const response = await fetch(blob.url);
        const payload = await response.json();
        return sendJson(res, 200, { ok: true, ...payload, blobUrl: blob.url });
      } catch (e) {
        return sendJson(res, 404, { ok: false, error: 'No blob config found yet.' });
      }
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const config = body.config;
      if (!config) {
        return sendJson(res, 400, { ok: false, error: 'Missing config' });
      }
      const payload = {
        kind: 'zootr-config',
        version: 1,
        updatedAt: new Date().toISOString(),
        config,
      };
      const latest = await put('config/latest.json', JSON.stringify(payload, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      const stamp = payload.updatedAt.replace(/[:.]/g, '-');
      const historical = await put(`config/history/${stamp}.json`, JSON.stringify(payload, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      });
      return sendJson(res, 200, { ok: true, latestUrl: latest.url, historyUrl: historical.url, updatedAt: payload.updatedAt });
    }

    return sendJson(res, 405, { ok: false, error: 'Method not allowed' });
  } catch (error) {
    return sendJson(res, 500, { ok: false, error: error.message || 'Unknown error' });
  }
};
