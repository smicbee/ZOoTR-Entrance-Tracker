import LocationTrackerData from "../DataObjects/LocationTrackerData";

export default function getInitialLocationChecks() {
    const checks = {};
    Object.keys(LocationTrackerData).forEach(region => {
        checks[region] = {};
        (LocationTrackerData[region] || []).forEach(item => {
            checks[region][item.name] = !!item.defaultChecked;
        });
    });
    return checks;
}
