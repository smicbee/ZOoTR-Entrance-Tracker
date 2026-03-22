import React from "react";

export default function TrackerRegionModal({ region, isOpen, onClose, locationChecks, toggleLocationCheck, locationTrackerData }) {
    if (!isOpen || !region) {
        return null;
    }

    const items = [...(locationTrackerData?.[region] || [])].sort((a, b) => a.name.localeCompare(b.name));
    const checks = locationChecks[region] || {};
    const checked = items.filter(item => checks[item.name]).length;

    return (
        <div className="tracker-modal-overlay" onClick={onClose}>
            <div className="tracker-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="tracker-modal-header">
                    <div>
                        <h3 className="title is-5 has-text-white tracker-modal-title">{region}</h3>
                        <p className="tracker-modal-subtitle">{checked}/{items.length} erledigt</p>
                    </div>
                    <button type="button" className="button is-small is-dark is-outlined tracker-modal-close" onClick={onClose} aria-label="Close tracker modal">✕</button>
                </div>
                <div className="tracker-modal-content">
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
        </div>
    );
}
