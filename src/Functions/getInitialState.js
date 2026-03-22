import Hyrule from "../DataObjects/Hyrule";
import Songs from "../DataObjects/Songs";
import EntranceTypes from "../DataObjects/EntranceTypes";

export default function getInitialState(hyruleSource = Hyrule) {
    let hyrule = JSON.parse(JSON.stringify(hyruleSource));
    let interiorEntrances = {};
    let availableOverworldEntrances = {};
    let availableDungeons = [];
    let availableHouses = [];
    let availableHouseEntrances = {};
    let availableGrottos = [];
    let availableGrottoEntrances = {};
    let songs = JSON.parse(JSON.stringify(Songs));
    let showRouteFinder = false;
    let startAsChild = true;
    let overworldOnly = false;
    let allOverworldEntrances = {};
    let spawnPoints = { child: null, adult: null };

    Object.keys(hyrule).forEach(area => {
        availableOverworldEntrances[area] = [];
        availableGrottoEntrances[area] = [];
        allOverworldEntrances[area] = [];

        Object.keys(hyrule[area].entrances).forEach(entranceName => {
            let entrance = hyrule[area].entrances[entranceName];
            let type = entrance.type;

            if (type === EntranceTypes.Overworld) {
                availableOverworldEntrances[area].push(entranceName);
                allOverworldEntrances[area].push(entranceName);
            } else if (type === EntranceTypes.Dungeon) {
                availableDungeons.push(entranceName);
            } else {
                let displayName = entrance.display || entranceName;

                if (type === EntranceTypes.House) {
                    availableHouses.push(displayName);
                    if (availableHouseEntrances[area] === undefined) {
                        availableHouseEntrances[area] = [];
                    }
                    availableHouseEntrances[area].push(entranceName);
                } else if (type === EntranceTypes.Grotto) {
                    availableGrottos.push(displayName);
                    availableGrottoEntrances[area].push(entranceName);
                }
            }
        });
    });

    return {
        hyrule,
        interiorEntrances,
        availableOverworldEntrances,
        availableDungeons,
        availableHouses,
        availableHouseEntrances,
        availableGrottos,
        availableGrottoEntrances,
        songs,
        showRouteFinder,
        startAsChild,
        overworldOnly,
        routeFinderStart: null,
        routeFinderEnd: null,
        allOverworldEntrances,
        spawnPoints
    };
}
