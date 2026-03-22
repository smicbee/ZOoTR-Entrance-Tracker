import EntranceTypes from "./DataObjects/EntranceTypes";

const TYPE_ICON_MAP = {
    [EntranceTypes.Overworld]: "🗺️",
    [EntranceTypes.Dungeon]: "🏰",
    [EntranceTypes.House]: "🏠",
    [EntranceTypes.Grotto]: "🕳️",
    [EntranceTypes["Kaepora Gaebora"]]: "🦉",
    [EntranceTypes.Song]: "🎵"
};

const TYPE_PRIORITY = [
    EntranceTypes.Dungeon,
    EntranceTypes.House,
    EntranceTypes.Grotto,
    EntranceTypes["Kaepora Gaebora"],
    EntranceTypes.Song,
    EntranceTypes.Overworld
];

export function getRegionPrimaryType(region) {
    const entrances = Object.values(region?.entrances || {});
    for (const type of TYPE_PRIORITY) {
        if (entrances.some((entrance) => entrance?.type === type)) {
            return type;
        }
    }
    return EntranceTypes.Overworld;
}

export function getRegionIcon(region) {
    return TYPE_ICON_MAP[getRegionPrimaryType(region)] || "🗺️";
}
