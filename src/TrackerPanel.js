import React, { useEffect, useMemo, useRef } from "react";

export default function TrackerPanel({ locationChecks, toggleLocationCheck, focusRegion, locationTrackerData }) {
    const sectionRefs = useRef({});
    const regions = useMemo(() => Object.keys(locationTrackerData || {}).sort((a, b) => a.localeCompare(b)), [locationTrackerData]);

    useEffect(() => {
        if (!focusRegion) return;
        const el = sectionRefs.current[focusRegion];
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [focusRegion]);

    return (
        <div className="tracker-panel" id="tracker">
            <div className="tracker-panel-inner">
                <h2 className="title is-4 has-text-centered">Tracker</h2>
                <div className="tracker-region-grid">
                    {regions.map(region => {
                        const items = [...(locationTrackerData[region] || [])].sort((a, b) => a.name.localeCompare(b.name));
                        const checks = locationChecks[region] || {};
                        const checked = items.filter(item => checks[item.name]).length;
                        return (
                            <div
                                key={region}
                                ref={el => { sectionRefs.current[region] = el; }}
                                className="card tracker-region-card"
                            >
                                <div className="card-header has-background-dark">
                                    <div className="tracker-region-title">
                                        <span>{region}</span>
                                        <span className="tracker-region-count">{checked}/{items.length}</span>
                                    </div>
                                </div>
                                <div className="card-content tracker-region-content">
                                    {items.map(item => (
                                        <label key={item.name} className="checkbox tracker-item-row">
                                            <input
                                                type="checkbox"
                                                checked={!!checks[item.name]}
                                                onChange={() => toggleLocationCheck(region, item.name)}
                                            />
                                            <span className="tracker-item-label">{item.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
