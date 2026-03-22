import PromptForLocationEntrance from "./PromptForLocationEntrance";
import InteriorConnection from "./DataObjects/InteriorConnection";
import HyruleData from "./DataObjects/Hyrule";
import LocationTrackerData from "./DataObjects/LocationTrackerData";
import getInitialState from "./Functions/getInitialState";
import React, { useEffect, useState, useLayoutEffect } from "react";
import EntranceTypes from "./DataObjects/EntranceTypes";
import useLocalStorage from "./Hooks/useLocalStorage";
import AreasToAdd from "./DataObjects/AreasToAdd";
import Grottos from "./DataObjects/Grottos";
import Houses from "./DataObjects/Houses";
import RouteFinder from "./RouteFinder";
import Songs from "./Songs";
import Menu from "./Menu";
import Area from "./Area";
import TrackerPanel from "./TrackerPanel";
import TrackerRegionModal from "./TrackerRegionModal";
import AdminModal from "./AdminModal";
import getInitialLocationChecks from "./Functions/getInitialLocationChecks";

const normalizeLocationTrackerData = (hyruleConfig, locationTrackerData = {}) => {
    const normalized = {};
    Object.keys(hyruleConfig || {}).forEach((region) => {
        normalized[region] = Array.isArray(locationTrackerData?.[region])
            ? JSON.parse(JSON.stringify(locationTrackerData[region]))
            : [];
    });
    return normalized;
};

export default function ZOoTREntranceTracker({ ReactGA }) {

    const defaultTrackerConfig = {
        hyrule: JSON.parse(JSON.stringify(HyruleData)),
        locationTrackerData: normalizeLocationTrackerData(HyruleData, LocationTrackerData)
    };
    const [trackerConfig, setTrackerConfig] = useLocalStorage("trackerConfig", defaultTrackerConfig);
    const [showAdmin, setShowAdmin] = useState(false);
    const [didHydrateFromBlob, setDidHydrateFromBlob] = useState(false);
    const normalizedLocationTrackerData = normalizeLocationTrackerData(trackerConfig.hyrule, trackerConfig.locationTrackerData);

    let init = getInitialState(trackerConfig.hyrule);

    // state tracked in localStorage
    const [availableOverworldEntrances, setAvailableOverworldEntrances] = useLocalStorage("availableOverworldEntrances", init.availableOverworldEntrances);
    const [availableGrottoEntrances, setAvailableGrottoEntrances] = useLocalStorage("availableGrottoEntrances", init.availableGrottoEntrances);
    const [availableHouseEntrances, setAvailableHouseEntrances] = useLocalStorage("availableHouseEntrances", init.availableHouseEntrances);
    const [allOverworldEntrances, setAllOverworldEntrances] = useLocalStorage("allOverworldEntrances", init.allOverworldEntrances);
    const [availableDungeons, setAvailableDungeons] = useLocalStorage("availableDungeons", init.availableDungeons);
    const [interiorEntrances, setInteriorEntrances] = useLocalStorage("interiorEntrances", init.interiorEntrances);
    const [availableGrottos, setAvailableGrottos] = useLocalStorage("availableGrottos", init.availableGrottos);
    const [routeFinderStart, setRouteFinderStart] = useLocalStorage("routeFinderStart", init.routeFinderStart);
    const [availableHouses, setAvailableHouses] = useLocalStorage("availableHouses", init.availableHouses);
    const [showRouteFinder, setShowRouteFinder] = useLocalStorage("showRouteFinder", init.showRouteFinder);
    const [routeFinderEnd, setRouteFinderEnd] = useLocalStorage("routeFinderEnd", init.routeFinderEnd);
    const [overworldOnly, setOverworldOnly] = useLocalStorage("overworldOnly", init.overworldOnly);
    const [startAsChild, setStartAsChild] = useLocalStorage("startAsChild", init.startAsChild);
    const [hyrule, setHyrule] = useLocalStorage("hyrule", init.hyrule);
    const [songs, setSongs] = useLocalStorage("songs", init.songs);
    const [showTracker, setShowTracker] = useLocalStorage("showTracker", false);
    const [spawnPoints, setSpawnPoints] = useLocalStorage("spawnPoints", init.spawnPoints || { child: null, adult: null });
    const [locationChecks, setLocationChecks] = useLocalStorage("locationChecks", getInitialLocationChecks(normalizedLocationTrackerData));
    const [trackerFocusRegion] = useState(null);
    const [trackerModalRegion, setTrackerModalRegion] = useState(null);

    // state for app layout, reset on page load
    const [menuHeight, setMenuHeight] = useState(0);
    const [songsHeight, setSongsHeight] = useState(0);
    const [windowChanges, setWindowChanges] = useState(false);

    // trigger re-render when window size changes
    // cause menu and songs to reassess sizing
    useLayoutEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize) };
    });

    useLayoutEffect(() => {
        if (overworldOnly) {
            setOverworldOnly(false);
        }
    }, [overworldOnly, setOverworldOnly]);

    const handleResize = () => {
        setWindowChanges(!windowChanges);
    };

    const trackGaEvent = (category, action) => {
        ReactGA.event({
            category,
            action
        });
    };

    const getLocationsToPromptForBasedOnState = () => {
        let prompts = [];
        let startPointSelected = interiorEntrances[Houses["Link's House"]] !== undefined || interiorEntrances[Houses["Temple of Time"]] !== undefined;

        if (!startPointSelected) {
            if (startAsChild) {
                prompts.push(Houses["Link's House"]);
            } else {
                prompts.push(Houses["Temple of Time"]);
            }
            // Don't allow any other prompts if start point isn't set
            return prompts;
        } else if (!startAsChild && interiorEntrances[Houses["Link's House"]] === undefined) {
            prompts.push(Houses["Link's House"]);
        }

        if (overworldOnly && interiorEntrances[Grottos["Dampe's Grave"]] === undefined) {
            prompts.push(Grottos["Dampe's Grave"]);
        }

        let windmillEntranceFound;
        if (interiorEntrances[Houses.Windmill] === undefined) {
            windmillEntranceFound = false;
        } else if (interiorEntrances[Houses.Windmill] !== undefined &&
            interiorEntrances[Houses.Windmill].length === 1 &&
            interiorEntrances[Houses.Windmill][0].interior !== Grottos["Dampe's Grave"]) {
            windmillEntranceFound = true;
        } else if (interiorEntrances[Houses.Windmill].length >= 2) {
            windmillEntranceFound = true;
        } else {
            windmillEntranceFound = false;
        }

        if ((overworldOnly && !windmillEntranceFound) ||
            (!overworldOnly && !windmillEntranceFound && interiorEntrances[Grottos["Dampe's Grave"]] !== undefined)) {
            prompts.push(Houses.Windmill);
        }

        if (songs["Prelude of Light"].collected &&
            (interiorEntrances[Houses["Temple of Time"]] === undefined ||
                interiorEntrances[Houses["Temple of Time"]].length === 1)) {
            prompts.push(Houses["Temple of Time"]);
        }

        if (interiorEntrances[Houses["Potion Shop Back"]] !== undefined &&
            interiorEntrances[Houses["Potion Shop Front"]] === undefined) {
            prompts.push(Houses["Potion Shop Front"]);
        } else if (interiorEntrances[Houses["Potion Shop Front"]] !== undefined &&
            interiorEntrances[Houses["Potion Shop Back"]] === undefined) {
            prompts.push(Houses["Potion Shop Back"]);
        }

        return prompts;
    };

    const applyState = (state, config = trackerConfig) => {
        let initialState = getInitialState(config.hyrule);
        let stateToApply = state || initialState;

        setHyrule(stateToApply.hyrule || initialState.hyrule);
        setInteriorEntrances(stateToApply.interiorEntrances || initialState.interiorEntrances);
        setAvailableOverworldEntrances(stateToApply.availableOverworldEntrances || initialState.availableOverworldEntrances);
        setAvailableDungeons(stateToApply.availableDungeons || initialState.availableDungeons);
        setAvailableHouses(stateToApply.availableHouses || initialState.availableHouses);
        setAvailableHouseEntrances(stateToApply.availableHouseEntrances || initialState.availableHouseEntrances);
        setAvailableGrottos(stateToApply.availableGrottos || initialState.availableGrottos);
        setAvailableGrottoEntrances(stateToApply.availableGrottoEntrances || initialState.availableGrottoEntrances);
        setSongs(stateToApply.songs || initialState.songs);
        setShowRouteFinder(stateToApply.showRouteFinder !== undefined ? stateToApply.showRouteFinder : initialState.showRouteFinder);
        setStartAsChild(stateToApply.startAsChild !== undefined ? stateToApply.startAsChild : initialState.startAsChild);
        setOverworldOnly(stateToApply.overworldOnly !== undefined ? stateToApply.overworldOnly : initialState.overworldOnly);
        setRouteFinderStart(stateToApply.routeFinderStart !== undefined ? stateToApply.routeFinderStart : initialState.routeFinderStart);
        setRouteFinderEnd(stateToApply.routeFinderEnd !== undefined ? stateToApply.routeFinderEnd : initialState.routeFinderEnd);
        setAllOverworldEntrances(stateToApply.allOverworldEntrances || initialState.allOverworldEntrances);
        setShowTracker(stateToApply.showTracker !== undefined ? stateToApply.showTracker : false);
        setLocationChecks({ ...getInitialLocationChecks(normalizeLocationTrackerData(config.hyrule, config.locationTrackerData)), ...(stateToApply.locationChecks || {}) });
    };

    const applyTrackerConfig = (nextConfig) => {
        const normalizedConfig = {
            ...nextConfig,
            locationTrackerData: normalizeLocationTrackerData(nextConfig.hyrule, nextConfig.locationTrackerData)
        };
        setTrackerConfig(normalizedConfig);
        applyState({ ...getInitialState(normalizedConfig.hyrule), locationChecks: getInitialLocationChecks(normalizedConfig.locationTrackerData), showTracker: false }, normalizedConfig);
    };

    const saveTrackerConfig = (nextConfig) => {
        applyTrackerConfig(nextConfig);
    };

    const loadBlobConfig = async () => {
        try {
            const response = await fetch('/api/config');
            const result = await response.json();
            if (!response.ok || !result.ok) {
                return { ok: false, error: result.error || 'Blob load failed' };
            }
            return { ok: true, config: result.config };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    };

    const publishBlobConfig = async (config) => {
        try {
            const response = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ config })
            });
            const result = await response.json();
            if (!response.ok || !result.ok) {
                return { ok: false, error: result.error || 'Blob publish failed' };
            }
            return { ok: true, updatedAt: result.updatedAt, latestUrl: result.latestUrl };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (didHydrateFromBlob) {
            return;
        }

        let isCancelled = false;

        const hydrateFromBlob = async () => {
            const result = await loadBlobConfig();
            if (isCancelled) {
                return;
            }
            if (result.ok && result.config?.hyrule) {
                const normalizedConfig = {
                    ...result.config,
                    locationTrackerData: normalizeLocationTrackerData(result.config.hyrule, result.config.locationTrackerData)
                };
                setTrackerConfig(normalizedConfig);
                applyState({ ...getInitialState(normalizedConfig.hyrule), locationChecks: getInitialLocationChecks(normalizedConfig.locationTrackerData), showTracker: false }, normalizedConfig);
            }
            setDidHydrateFromBlob(true);
        };

        hydrateFromBlob();

        return () => {
            isCancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [didHydrateFromBlob]);

    const exportState = () => ({
        availableOverworldEntrances,
        availableGrottoEntrances,
        availableHouseEntrances,
        allOverworldEntrances,
        availableDungeons,
        interiorEntrances,
        availableGrottos,
        routeFinderStart,
        availableHouses,
        showRouteFinder,
        routeFinderEnd,
        overworldOnly,
        startAsChild,
        hyrule,
        songs,
        showTracker,
        locationChecks
    });

    const resetState = () => {
        applyState({ ...getInitialState(trackerConfig.hyrule), locationChecks: getInitialLocationChecks(normalizedLocationTrackerData), showTracker: false });
    };

    const getTrackerRegionForArea = (areaName) => areaName;

    const getTrackerCountsForArea = (areaName) => {
        const region = getTrackerRegionForArea(areaName);
        const regionChecks = locationChecks[region] || {};
        const entries = (normalizedLocationTrackerData[region] || []).map(item => item.name);
        const checked = entries.filter(key => regionChecks[key]).length;
        return { region, checked, total: entries.length };
    };

    const trackerSummary = Object.keys(normalizedLocationTrackerData || {}).reduce((acc, region) => {
        const entries = normalizedLocationTrackerData[region] || [];
        const checks = locationChecks[region] || {};
        acc.total += entries.length;
        acc.checked += entries.filter((item) => checks[item.name]).length;
        return acc;
    }, { checked: 0, total: 0 });

    const toggleLocationCheck = (region, itemName) => {
        const current = locationChecks[region] || {};
        setLocationChecks({
            ...locationChecks,
            [region]: {
                ...current,
                [itemName]: !current[itemName]
            }
        });
    };

    const openTrackerForArea = (areaName) => {
        const region = getTrackerRegionForArea(areaName);
        setTrackerModalRegion(region);
    };

    const setSpawnPoint = (age, selection) => {
        if (!selection?.area || !selection?.entrance) {
            return;
        }
        let _hyrule = hyrule;
        let _interiorEntrances = interiorEntrances;
        [_hyrule, _interiorEntrances] = setAreaToAccessible(_hyrule, _interiorEntrances, selection.area);
        setHyrule({ ..._hyrule });
        setInteriorEntrances({ ..._interiorEntrances });
        setSpawnPoints((prev) => ({ ...prev, [age]: { area: selection.area, entrance: selection.entrance } }));
        setStartAsChild(age === "child");
        trackGaEvent("tracker", `set ${age} spawn`);
    };

    const getDerivedConfigEntranceMap = (includeAssigned = false) => {
        const map = {};
        Object.keys(hyrule || {}).forEach((area) => {
            map[area] = [];
            Object.keys(hyrule[area]?.entrances || {}).forEach((entranceName) => {
                const entrance = hyrule[area].entrances[entranceName];
                const isAssigned = (entrance.leadsTo !== null && entrance.leadsTo !== undefined) || (entrance.interior !== null && entrance.interior !== undefined);
                if (!includeAssigned && isAssigned) {
                    return;
                }
                map[area].push(entranceName);
            });
        });
        return map;
    };

    const derivedAvailableConfigEntrances = getDerivedConfigEntranceMap(false);
    const derivedAllConfigEntrances = getDerivedConfigEntranceMap(true);

    const setPropertiesOfEntrance = (_hyrule, area, entrance, obj) => {
        let _area = _hyrule[area];
        Object.keys(obj).forEach((prop) => {
            _area.entrances[entrance][prop] = obj[prop];
        })
        return { ..._hyrule, [area]: _area };
    };

    const setPropertiesOfArea = (_hyrule, area, obj) => {
        if (_hyrule[area] === undefined) {
            console.error(`${area} is not an area`)
        }
        let _area = _hyrule[area];
        Object.keys(obj).forEach(prop => {
            _area[prop] = obj[prop];
        });
        return { ...hyrule, [area]: _area };
    };

    const toggleEntranceClear = (area, entrance) => {
        let _hyrule = hyrule;
        _hyrule = setPropertiesOfEntrance(_hyrule, area, entrance, { "clear": !hyrule[area].entrances[entrance].clear });
        trackGaEvent("tracker", "toggle entrance clear");
        setHyrule({ ..._hyrule });
    };

    const toggleAreaExpanded = (area) => {
        let _hyrule = hyrule;
        trackGaEvent("tracker", `set ${area} isExpanded: ${!hyrule[area].isExpanded}`);
        _hyrule = setPropertiesOfArea(_hyrule, area, { "isExpanded": !hyrule[area].isExpanded });
        setHyrule({..._hyrule});
    };

    const expandAllAreas = () => {
        let _hyrule = hyrule;
        trackGaEvent("tracker", "expand all areas");
        Object.keys(_hyrule).forEach(area => {
            _hyrule[area].isExpanded = true;
        });
        setHyrule({..._hyrule});
    };

    const hideAllAreas = () => {
        let _hyrule = hyrule;
        trackGaEvent("tracker", "hide all areas");
        Object.keys(_hyrule).forEach(area => {
            if (_hyrule[area].isAccessible) {
                _hyrule[area].isExpanded = false;
            }
        });
        setHyrule({..._hyrule});
    };

    const toggleSongCollected = song => {
        let _interiorEntrances = interiorEntrances;
        let _hyrule = hyrule;
        let _song = songs[song];
        _song.collected = !songs[song].collected;
        if (_song.collected) {
            if (_song.locationType === EntranceTypes.Overworld) {
                [_hyrule, _interiorEntrances] = setAreaToAccessible(_hyrule, _interiorEntrances, _song.location);
            }
            [_hyrule, _interiorEntrances] = addInteriorEntrance(
                _hyrule,
                _interiorEntrances,
                {
                    [_song.location]: { "song": song }
                }
            );
        } else {
            [_hyrule, _interiorEntrances] = removeInteriorEntrances(
                _hyrule,
                _interiorEntrances,
                {
                    [_song.location]: [{ "song": song }]
                }
            );
            if (_song.locationType === EntranceTypes.Overworld) {
                [_hyrule, _interiorEntrances] = hideAreasIfEmpty(_hyrule, _interiorEntrances, [_song.location]);
            }
        }
        trackGaEvent("tracker", "toggle song collected");
        setSongs({ ...songs, [song]: _song });
        setInteriorEntrances({ ..._interiorEntrances });
        setHyrule({ ..._hyrule });
    };

    const addInteriorEntrance = (_hyrule, _interiorEntrances, obj) => {
        Object.keys(obj).forEach(location => {
            if (_interiorEntrances[location] === undefined) {
                _interiorEntrances[location] = [];
            }
            _interiorEntrances[location].push(obj[location]);
            if (InteriorConnection[location] !== undefined) {
                if (_interiorEntrances[InteriorConnection[location].location] === undefined) {
                    _interiorEntrances[InteriorConnection[location].location] = [];
                }
                _interiorEntrances[InteriorConnection[location].location].push(InteriorConnection[location].entranceObject);
                if (InteriorConnection[location].type === EntranceTypes.Overworld) {
                    setPropertiesOfArea(_hyrule, InteriorConnection[location].location, { "isAccessible": true });
                }
            }
        });
        return [_hyrule, _interiorEntrances];
    };

    const removeInteriorEntrances = (_hyrule, _interiorEntrances, obj) => {
        let _locationsAndObjects = {};

        Object.keys(obj).forEach(location => {
            _locationsAndObjects[location] = obj[location];
            if (InteriorConnection[location] !== undefined) {
                if (_locationsAndObjects[InteriorConnection[location].location] === undefined) {
                    _locationsAndObjects[InteriorConnection[location].location] = [];
                }
                _locationsAndObjects[InteriorConnection[location].location].push(InteriorConnection[location].entranceObject);
            }
        });
        let _locationsObj = {};
        let _locationsToFilter = Object.keys(_locationsAndObjects);

        for (let i = 0; i < _locationsToFilter.length; i++) {
            let locationBeingFiltered = _locationsToFilter[i];
            let _location = _interiorEntrances[locationBeingFiltered];
            if (_location === undefined) {
                continue;
            }
            _locationsAndObjects[locationBeingFiltered].forEach(entranceObj => {
                _location = _location.filter(entrance => {
                    return !(
                        entrance.area === entranceObj.area &&
                        entrance.entrance === entranceObj.entrance &&
                        entrance.interior === entranceObj.interior &&
                        entrance.song === entranceObj.song
                    );
                });
            });
            if (_location.length === 0) {
                delete _interiorEntrances[locationBeingFiltered];
                [_hyrule, _interiorEntrances] = hideAreasIfEmpty(_hyrule, _interiorEntrances, [locationBeingFiltered]);
            } else {
                _locationsObj[locationBeingFiltered] = _location;
            }
        };
        _interiorEntrances = { ..._interiorEntrances, ..._locationsObj };
        return [_hyrule, _interiorEntrances, Object.keys(_locationsAndObjects)];
    };

    const returnArrayForType = type => {
        if (type === EntranceTypes.House) {
            return availableHouses;
        } else if (type === EntranceTypes.Dungeon) {
            return availableDungeons;
        } else if (type === EntranceTypes.Grotto) {
            return availableGrottos;
        }
        return [];
    };

    const setArrayForType = (type, array) => {
        if (type === EntranceTypes.House) {
            setAvailableHouses([...array]);
        } else if (type === EntranceTypes.Dungeon) {
            setAvailableDungeons([...array]);
        } else if (type === EntranceTypes.Grotto) {
            setAvailableGrottos([...array]);
        }
    };

    const removeInteriorFromPool = (type, interior) => {
        let array = returnArrayForType(type);
        if (!array) {
            return;
        }
        array.splice(array.indexOf(interior), 1);
        setArrayForType(type, [...array])
    };

    const addInteriorBackIntoPool = (type, interior) => {
        let array = returnArrayForType(type);
        if (!array) {
            return;
        }
        array.push(interior);
        setArrayForType(type, [...array]);
    };

    const returnObjectForType = type => {
        if (type === EntranceTypes.Overworld) {
            return availableOverworldEntrances;
        } else if (type === EntranceTypes.House) {
            return availableHouseEntrances;
        } else if (type === EntranceTypes.Grotto) {
            return availableGrottoEntrances;
        }
        return {};
    };

    const setObjectForType = (type, object) => {
        if (type === EntranceTypes.Overworld) {
            setAvailableOverworldEntrances({ ...object });
        } else if (type === EntranceTypes.House) {
            setAvailableHouseEntrances({ ...object });
        } else if (type === EntranceTypes.Grotto) {
            setAvailableGrottoEntrances({ ...object });
        }
    };

    const removeItemFromObjectArray = (area, type, item) => {
        let _obj = returnObjectForType(type);
        let _array = _obj[area];
        _array.splice(_obj[area].indexOf(item), 1);
        setObjectForType(type, { ..._obj, [area]: _array });
    }

    const addItemToObjectArray = (area, type, item) => {
        let _obj = returnObjectForType(type);
        let _array = _obj[area];
        _array.push(item);
        setObjectForType(type, { ..._obj, [area]: _array });
    };

    const removeAvailableHouseEntrance = (area, entrance) => {
        removeItemFromObjectArray(area, EntranceTypes.House, entrance)
    };

    const addAvailableHouseEntrance = (area, entrance) => {
        addItemToObjectArray(area, EntranceTypes.House, entrance)
    };

    const removeAvailableGrottoEntrance = (area, entrance) => {
        removeItemFromObjectArray(area, EntranceTypes.Grotto, entrance)
    };

    const addAvailableGrottoEntrance = (area, entrance) => {
        addItemToObjectArray(area, EntranceTypes.Grotto, entrance)
    };

    const removeAvailableOverworldEntrance = (area, entrance) => {
        removeItemFromObjectArray(area, EntranceTypes.Overworld, entrance);
    };

    const addAvailableOverworldEntrance = (area, entrance) => {
        addItemToObjectArray(area, EntranceTypes.Overworld, entrance);
    };

    const syncLegacyPoolsForAreaEntrance = (sourceHyrule, area, entranceName, mode) => {
        const entrance = sourceHyrule?.[area]?.entrances?.[entranceName];
        if (!entrance) {
            return;
        }

        const poolValue = entrance.display || entranceName;
        const syncInteriorPool = mode === "remove" ? removeInteriorFromPool : addInteriorBackIntoPool;

        if (entrance.type === EntranceTypes.Overworld) {
            if (mode === "remove") {
                removeAvailableOverworldEntrance(area, entranceName);
            } else {
                addAvailableOverworldEntrance(area, entranceName);
            }
            return;
        }

        if (entrance.type === EntranceTypes.House) {
            syncInteriorPool(EntranceTypes.House, poolValue);
            if (mode === "remove") {
                removeAvailableHouseEntrance(area, entranceName);
            } else {
                addAvailableHouseEntrance(area, entranceName);
            }
            return;
        }

        if (entrance.type === EntranceTypes.Grotto) {
            syncInteriorPool(EntranceTypes.Grotto, poolValue);
            if (mode === "remove") {
                removeAvailableGrottoEntrance(area, entranceName);
            } else {
                addAvailableGrottoEntrance(area, entranceName);
            }
            return;
        }

        if (entrance.type === EntranceTypes.Dungeon) {
            syncInteriorPool(EntranceTypes.Dungeon, poolValue);
        }
    };

    const setInterior = (_hyrule, area, entrance, interior) => {
        _hyrule = setPropertiesOfEntrance(_hyrule, area, entrance, { "clear": false, "interior": interior });
        return _hyrule;
    };

    const resetInterior = (_hyrule, area, entrance) => {
        _hyrule = setPropertiesOfEntrance(_hyrule, area, entrance, { "interior": null });
        return _hyrule;
    };

    const setAreaToAccessible = (_hyrule, _interiorEntrances, area) => {
        // on first time, check for areas to add
        if (!_hyrule[area].isAccessible) {
            if (AreasToAdd[area] !== undefined) {
                [_hyrule, _interiorEntrances] = addInteriorEntrance(
                    _hyrule,
                    _interiorEntrances,
                    {
                        [AreasToAdd[area].name]: AreasToAdd[area].entranceObject
                    }
                );
                _hyrule = setPropertiesOfArea(_hyrule, AreasToAdd[area].name, { "isAccessible": true });
            }
        }
        _hyrule = setPropertiesOfArea(_hyrule, area, { "isAccessible": true });
        return [_hyrule, _interiorEntrances];
    };

    const areaIsEmpty = (_hyrule, areaName) => {
        let area = _hyrule[areaName];
        if (area === undefined) {
            return false;
        }
        let empty = true;
        if (area.hasKaeporaLakeHyliaLanding || area.hasKaeporaDeathMountainTrailLanding) {
            empty = false;
        }
        Object.keys(area.entrances).forEach(key => {
            let entrance = area.entrances[key];
            if (entrance.interior !== undefined && entrance.interior !== null) {
                empty = false;
            } else if (entrance.leadsTo !== undefined && entrance.leadsTo !== null) {
                empty = false;
            }
        });
        if (interiorEntrances[areaName] !== undefined &&
            interiorEntrances[areaName].length > 0) {
            empty = false;
        }
        return empty;
    };

    const hideAreasIfEmpty = (_hyrule, _interiorEntrances, areas) => {
        for (let i = 0; i < areas.length; i++) {
            let areaName = areas[i];
            if (areaIsEmpty(_hyrule, areaName)) {
                _hyrule = setPropertiesOfArea(_hyrule, areaName, { "isAccessible": false });
                if (AreasToAdd[areaName] !== undefined) {
                    [_hyrule, _interiorEntrances] = removeInteriorEntrances(
                        _hyrule,
                        _interiorEntrances,
                        {
                            [AreasToAdd[areaName].name]: [AreasToAdd[areaName].entranceObject]
                        }
                    );
                    [_hyrule, _interiorEntrances] = hideAreasIfEmpty(_hyrule, _interiorEntrances, [AreasToAdd[areaName].name]);
                }
                if (routeFinderStart === areaName) {
                    setRouteFinderStart(null);
                } else if (routeFinderEnd === areaName) {
                    setRouteFinderEnd(null);
                }
            }
        };
        return [_hyrule, _interiorEntrances];
    };

    const setEntrance = (vanilla, selection) => {
        let _interiorEntrances = interiorEntrances;
        let _hyrule = hyrule;

        if (selection.area !== undefined && selection.entrance !== undefined) {
            const area = vanilla.area;
            const entrance = vanilla.entrance;
            const selectedArea = selection.area;
            const selectedEntrance = selection.entrance;

            _hyrule = setPropertiesOfEntrance(_hyrule, area, entrance, {
                clear: false,
                interior: null,
                leadsTo: { area: selectedArea, entrance: selectedEntrance }
            });
            _hyrule = setPropertiesOfEntrance(_hyrule, selectedArea, selectedEntrance, {
                clear: false,
                interior: null,
                leadsTo: { area, entrance }
            });

            removeAvailableOverworldEntrance(area, entrance);
            removeAvailableOverworldEntrance(selectedArea, selectedEntrance);

            [_hyrule, _interiorEntrances] = addInteriorEntrance(
                _hyrule,
                _interiorEntrances,
                {
                    [area]: { area: selectedArea, entrance: selectedEntrance },
                    [selectedArea]: { area, entrance }
                }
            );

            [_hyrule, _interiorEntrances] = setAreaToAccessible(_hyrule, _interiorEntrances, area);
            [_hyrule, _interiorEntrances] = setAreaToAccessible(_hyrule, _interiorEntrances, selectedArea);
            trackGaEvent("tracker", `set area-to-area entrance (${vanilla.type})`);

            setInteriorEntrances({ ..._interiorEntrances });
            setHyrule({ ..._hyrule });
            return;
        }

        switch (vanilla.type) {
            case EntranceTypes.Grotto:
            case EntranceTypes.House:
            case EntranceTypes.Dungeon:
            case EntranceTypes.Song: {
                let area = vanilla.area;
                let entrance = vanilla.entrance;
                let interior = selection.interior;

                _hyrule = setInterior(_hyrule, area, entrance, interior);

                removeInteriorFromPool(vanilla.type, interior);

                [_hyrule, _interiorEntrances] = addInteriorEntrance(
                    _hyrule,
                    _interiorEntrances,
                    {
                        [interior]: { "area": area, "entrance": entrance },
                        [area]: { "entrance": entrance, "interior": interior }
                    }
                );

                [_hyrule, _interiorEntrances] = setAreaToAccessible(_hyrule, _interiorEntrances, area);

                if (vanilla.type === EntranceTypes.House) {
                    removeAvailableHouseEntrance(area, entrance);
                } else if (vanilla.type === EntranceTypes.Grotto) {
                    removeAvailableGrottoEntrance(area, entrance);
                }
                trackGaEvent("tracker", "set interior entrance");
                break;
            }
            default: {
                throw Error("Invalid type: " + vanilla.type);
            }
        }
        setInteriorEntrances({ ..._interiorEntrances });
        setHyrule({ ..._hyrule });
    };

    const resetEntrance = (obj) => {
        let searchTerm = null;
        let _interiorEntrances = interiorEntrances;
        let _hyrule = hyrule;

        if (obj.leadsTo !== undefined && obj.leadsTo !== null) {
            const area = obj.area;
            const entrance = obj.entrance;
            const leadsToArea = obj.leadsTo.area;
            const leadsToEntrance = obj.leadsTo.entrance;
            searchTerm = area;

            _hyrule = setPropertiesOfEntrance(_hyrule, area, entrance, { leadsTo: null, interior: null });
            _hyrule = setPropertiesOfEntrance(_hyrule, leadsToArea, leadsToEntrance, { leadsTo: null, interior: null });

            syncLegacyPoolsForAreaEntrance(hyrule, area, entrance, "add");
            syncLegacyPoolsForAreaEntrance(hyrule, leadsToArea, leadsToEntrance, "add");

            let areasAffected;
            [_hyrule, _interiorEntrances, areasAffected] = removeInteriorEntrances(
                _hyrule,
                _interiorEntrances,
                {
                    [area]: [{ area: leadsToArea, entrance: leadsToEntrance }],
                    [leadsToArea]: [{ area, entrance }]
                }
            );

            [_hyrule, _interiorEntrances] = hideAreasIfEmpty(_hyrule, _interiorEntrances, areasAffected);
            trackGaEvent("tracker", `reset config entrance link (${obj.type})`);
        } else {
            switch (obj.type) {
                case EntranceTypes.Grotto:
                case EntranceTypes.House:
                case EntranceTypes.Dungeon:
                case EntranceTypes.Song: {
                    let area = obj.area;
                    let entrance = obj.entrance;
                    let interior = obj.interior;
                    searchTerm = interior;

                    _hyrule = resetInterior(_hyrule, area, entrance);

                    addInteriorBackIntoPool(obj.type, interior);

                    let areasAffected;
                    [_hyrule, _interiorEntrances, areasAffected] = removeInteriorEntrances(
                        _hyrule,
                        _interiorEntrances,
                        {
                            [interior]: [{ "area": area, "entrance": entrance }],
                            [area]: [{ "entrance": entrance, "interior": interior }]
                        }
                    );

                    [_hyrule, _interiorEntrances] = hideAreasIfEmpty(_hyrule, _interiorEntrances, areasAffected);
                    if (obj.type === EntranceTypes.House) {
                        addAvailableHouseEntrance(area, entrance);
                    } else if (obj.type === EntranceTypes.Grotto) {
                        addAvailableGrottoEntrance(area, entrance);
                    }
                    trackGaEvent("tracker", "reset interior entrance");
                    break;
                }
                default: {
                    throw Error("Invalid type: " + obj.type);
                }
            }
        }
        if (searchTerm !== null) {
            if (routeFinderStart === searchTerm) {
                setRouteFinderStart(null);
            } else if (routeFinderEnd === searchTerm) {
                setRouteFinderEnd(null);
            }
        }
        setInteriorEntrances({ ..._interiorEntrances });
        setHyrule({ ..._hyrule });
    };

    let locationsToPromptFor = getLocationsToPromptForBasedOnState();

    return (
        <div className="zootr-entrance-tracker">

            <Menu
                setMenuHeight={setMenuHeight}
                resetState={resetState}
                exportState={exportState}
                importState={applyState}
                currentState={exportState()}
                trackGaEvent={trackGaEvent}
                songsHeight={songsHeight}
                showAdmin={showAdmin}
                showTracker={showTracker}
                trackerSummary={trackerSummary}
                openAdmin={() => setShowAdmin((current) => !current)}
            />

            <div className="top-padding" style={{ height: menuHeight }} />

            {!showAdmin && Object.keys(interiorEntrances).length >= 1 &&
                <div className="app-config flex-wraps">
                    <div className="router-control config-control">
                        <div className="field is-grouped">
                            <p className="control">
                                <a
                                    href="#routing"
                                    className={"button is-outlined is-small " + (showRouteFinder ? "is-link" : "is-dark")}
                                    onClick={() => {
                                        trackGaEvent("config", "show route finder");
                                        setShowRouteFinder(true);
                                    }}
                                >
                                    Show Router
                                </a>
                            </p>
                            <p className="control">
                                <a
                                    href="#routing"
                                    className={"button is-outlined is-small " + (!showRouteFinder ? "is-link" : "is-dark")}
                                    onClick={() => {
                                        trackGaEvent("config", "hide route finder");
                                        setShowRouteFinder(false);
                                    }}
                                >
                                    Hide Router
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="tracker-control config-control">
                        <div className="field is-grouped">
                            <p className="control">
                                <a
                                    href="#tracker"
                                    className={"button is-outlined is-small " + (showTracker ? "is-link" : "is-dark")}
                                    onClick={() => {
                                        trackGaEvent("config", "show tracker");
                                        setShowTracker(true);
                                    }}
                                >
                                    Tracker ({trackerSummary.checked}/{trackerSummary.total})
                                </a>
                            </p>
                            <p className="control">
                                <a
                                    href="#tracker"
                                    className={"button is-outlined is-small " + (!showTracker ? "is-link" : "is-dark")}
                                    onClick={() => {
                                        trackGaEvent("config", "hide tracker");
                                        setShowTracker(false);
                                    }}
                                >
                                    Hide Tracker
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="area-expansion-control config-control">
                        <div className="field is-grouped">
                            <p className="control">
                                <a
                                    href="#expand"
                                    className="button is-outlined is-small"
                                    onClick={expandAllAreas} // tracked in the function
                                >
                                    Expand All Entrances
                                </a>
                            </p>
                            <p className="control">
                                <a
                                    href="#expand"
                                    className="button is-outlined is-small"
                                    onClick={hideAllAreas} // tracked in the function
                                >
                                    Hide All Entrances
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            }

            {showAdmin ? (
                <AdminModal
                    isOpen={showAdmin}
                    onClose={() => setShowAdmin(false)}
                    trackerConfig={trackerConfig}
                    onSaveConfig={saveTrackerConfig}
                    onLoadBlobConfig={loadBlobConfig}
                    onPublishBlobConfig={publishBlobConfig}
                />
            ) : (
                <>
                    {showRouteFinder ?
                        <RouteFinder
                            availableLocations={interiorEntrances}
                            toggleEntranceClear={toggleEntranceClear}
                            hyrule={hyrule}
                            start={routeFinderStart}
                            end={routeFinderEnd}
                            setRouteFinderStart={setRouteFinderStart}
                            setRouteFinderEnd={setRouteFinderEnd}
                            trackGaEvent={trackGaEvent}
                        />
                        :
                        ""
                    }

                    {showTracker ?
                        <TrackerPanel
                            locationChecks={locationChecks}
                            toggleLocationCheck={toggleLocationCheck}
                            focusRegion={trackerFocusRegion}
                            locationTrackerData={normalizedLocationTrackerData}
                            regionMeta={hyrule}
                        />
                        :
                        ""
                    }

                    <TrackerRegionModal
                        region={trackerModalRegion}
                        isOpen={!!trackerModalRegion}
                        onClose={() => setTrackerModalRegion(null)}
                        locationChecks={locationChecks}
                        toggleLocationCheck={toggleLocationCheck}
                        locationTrackerData={normalizedLocationTrackerData}
                    />

                    <div className="user-prompts">
                        {locationsToPromptFor.length > 0 &&
                            locationsToPromptFor.map((location, i) => {
                                return <PromptForLocationEntrance
                                    key={i}
                                    locationToPromptFor={location}
                                    availableEntrances={location === "__spawn__" ? derivedAllConfigEntrances : (Houses[location] !== undefined ? availableHouseEntrances : availableGrottoEntrances)}
                                    type={Houses[location] !== undefined ? EntranceTypes.House : EntranceTypes.Grotto}
                                    setEntrance={setEntrance}
                                    setSpawnPoint={setSpawnPoint}
                                    showInitialAgeCheck={location === "__spawn__"}
                                    startAsChild={startAsChild}
                                    setStartAsChild={setStartAsChild}
                                    toggleStartAsChild={() => setStartAsChild(!startAsChild)}
                                />
                            })
                        }
                    </div>

                    <div className="areas-container is-flex-desktop is-flex-tablet is-multiline flex-wraps">
                        {/* iterate through the areas of Hyrule */}
                        {hyrule !== undefined && Object.keys(hyrule).sort().map((areaName, i) => {
                            // get the current areas object from state
                            let area = hyrule[areaName];
                            // if it's not accessible, we don't want to display it
                            if (!area.isAccessible) {
                                return null;
                            }

                            const trackerCounts = getTrackerCountsForArea(areaName);

                            return <Area
                                key={i}
                                area={area}
                                availableDungeons={availableDungeons}
                                availableHouses={availableHouses}
                                availableOverworldEntrances={derivedAvailableConfigEntrances}
                                availableGrottos={availableGrottos}
                                allOverworldEntrances={derivedAllConfigEntrances}
                                availableConfigEntrances={derivedAvailableConfigEntrances}
                                allConfigEntrances={derivedAllConfigEntrances}
                                areaName={areaName}
                                setEntrance={setEntrance}
                                resetEntrance={resetEntrance}
                                toggleEntranceClear={toggleEntranceClear}
                                overworldOnly={overworldOnly}
                                startAsChild={startAsChild}
                                spawnPoints={spawnPoints}
                                toggleAreaExpanded={toggleAreaExpanded}
                                trackerCount={trackerCounts.checked}
                                trackerTotal={trackerCounts.total}
                                openTrackerForArea={openTrackerForArea}
                            />
                        })}
                    </div>

                    <div className="bottom-padding" style={{ height: songsHeight }} />

                    {/* display songs that can be collected and may open new areas */}
                    {Object.keys(interiorEntrances).length > 1 && <Songs
                        toggleSongCollected={toggleSongCollected}
                        setSongsHeight={setSongsHeight}
                        songs={songs}
                    />}
                </>
            )}
        </div>
    );
}
