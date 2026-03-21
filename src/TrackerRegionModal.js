import React from "react";
import LocationTrackerData from "./DataObjects/LocationTrackerData";

export default function TrackerRegionModal({ region, isOpen, onClose, locationChecks, toggleLocationCheck }) {
    if (!isOpen || !region) {
        return null;
    }

    const items = LocationTrackerData[region] || [];
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
                    <button type="button" className="button is-small is-dark is-outlined" onClick={onClose}>Close</button>
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
