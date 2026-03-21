import LocationTrackerData from "../DataObjects/LocationTrackerData";

export default function getInitialLocationChecks(locationTrackerData = LocationTrackerData) {
    const checks = {};
    Object.keys(locationTrackerData).forEach(region => {
        checks[region] = {};
        (locationTrackerData[region] || []).forEach(item => {
            checks[region][item.name] = !!item.defaultChecked;
        });
    });
    return checks;
}
