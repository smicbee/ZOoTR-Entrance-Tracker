import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import VanillaHyrule from "./DataObjects/VanillaHyrule";

const SeedStorageKey = "zootr-entrance-tracker-seeds-v1";
const ActiveSeedStorageKey = "zootr-entrance-tracker-active-seed-v1";

const getSeedStore = () => {
    try {
        const json = window.localStorage.getItem(SeedStorageKey);
        if (!json) {
            return { seeds: [] };
        }
        const parsed = JSON.parse(json);
        if (!parsed || !Array.isArray(parsed.seeds)) {
            return { seeds: [] };
        }
        return parsed;
    } catch (e) {
        return { seeds: [] };
    }
};

const saveSeedStore = (store) => {
    window.localStorage.setItem(SeedStorageKey, JSON.stringify(store));
};

const getActiveSeedId = () => {
    return window.localStorage.getItem(ActiveSeedStorageKey) || "";
};

const setActiveSeedIdStorage = (seedId) => {
    if (seedId) {
        window.localStorage.setItem(ActiveSeedStorageKey, seedId);
    } else {
        window.localStorage.removeItem(ActiveSeedStorageKey);
    }
};

export default function Menu({ showRouteFinder, overworldOnly, trackGaEvent, openAdmin, showAdmin, songsHeight = 0, trackerSummary, showTracker, ...props }) {

    const [message, setMessage] = useState("");
    const [currentMenuHeight, setCurrentMenuHeight] = useState(0);
    const [seedName, setSeedName] = useState("");
    const [savedSeeds, setSavedSeeds] = useState(() => getSeedStore().seeds);
    const [selectedSeedId, setSelectedSeedId] = useState(() => getActiveSeedId());
    const [showSeedBar, setShowSeedBar] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        if (message !== "") {
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    });

    useEffect(() => {
        if (!selectedSeedId) {
            return;
        }
        const store = getSeedStore();
        const index = store.seeds.findIndex(s => s.id === selectedSeedId);
        if (index === -1) {
            return;
        }
        store.seeds[index] = {
            ...store.seeds[index],
            updatedAt: new Date().toISOString(),
            state: props.currentState
        };
        saveSeedStore(store);
    }, [selectedSeedId, props.currentState]);

    useLayoutEffect(() => {
        handleResize();
    });

    const handleResize = () => {
        if (menuRef.current.clientHeight !== currentMenuHeight) {
            setCurrentMenuHeight(menuRef.current.clientHeight);
            props.setMenuHeight(menuRef.current.clientHeight);
        }
    };

    const refreshSeeds = () => {
        const seeds = getSeedStore().seeds;
        setSavedSeeds(seeds);
        if (selectedSeedId && !seeds.some(seed => seed.id === selectedSeedId)) {
            setSelectedSeedId("");
            setActiveSeedIdStorage("");
        }
    };

    const resetState = () => {
        if (!window.confirm("Are you sure you want to reset?")) {
            return;
        }
        props.resetState();
        setMessage("Tracker Reset");
        trackGaEvent("menu", "reset app state")
    };

    const saveCurrentSeed = () => {
        const trimmedName = seedName.trim();
        if (!trimmedName) {
            setMessage("Enter seed name first");
            return;
        }
        const state = props.exportState();
        const store = getSeedStore();
        const newSeed = {
            id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
            name: trimmedName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            state
        };
        store.seeds = [newSeed, ...store.seeds];
        saveSeedStore(store);
        setSeedName("");
        setSelectedSeedId(newSeed.id);
        setActiveSeedIdStorage(newSeed.id);
        refreshSeeds();
        setMessage("Seed saved");
        trackGaEvent("menu", "save seed state");
    };

    const overwriteSelectedSeed = () => {
        if (!selectedSeedId) {
            setMessage("Select a seed to overwrite");
            return;
        }
        const store = getSeedStore();
        const index = store.seeds.findIndex(s => s.id === selectedSeedId);
        if (index === -1) {
            setMessage("Seed not found");
            refreshSeeds();
            return;
        }
        if (!window.confirm(`Overwrite seed "${store.seeds[index].name}"?`)) {
            return;
        }
        store.seeds[index] = {
            ...store.seeds[index],
            updatedAt: new Date().toISOString(),
            state: props.exportState()
        };
        saveSeedStore(store);
        setActiveSeedIdStorage(selectedSeedId);
        refreshSeeds();
        setMessage("Seed overwritten");
        trackGaEvent("menu", "overwrite seed state");
    };

    const renameSelectedSeed = () => {
        if (!selectedSeedId) {
            setMessage("Select a seed to rename");
            return;
        }
        const trimmedName = seedName.trim();
        if (!trimmedName) {
            setMessage("Enter new seed name first");
            return;
        }
        const store = getSeedStore();
        const index = store.seeds.findIndex(s => s.id === selectedSeedId);
        if (index === -1) {
            setMessage("Seed not found");
            refreshSeeds();
            return;
        }
        store.seeds[index] = {
            ...store.seeds[index],
            name: trimmedName,
            updatedAt: new Date().toISOString()
        };
        saveSeedStore(store);
        setSeedName("");
        setActiveSeedIdStorage(selectedSeedId);
        refreshSeeds();
        setMessage("Seed renamed");
        trackGaEvent("menu", "rename seed state");
    };

    const loadSelectedSeed = () => {
        if (!selectedSeedId) {
            setMessage("Select a seed to load");
            return;
        }
        const store = getSeedStore();
        const seed = store.seeds.find(s => s.id === selectedSeedId);
        if (!seed) {
            setMessage("Seed not found");
            refreshSeeds();
            return;
        }
        props.importState(seed.state);
        setSeedName(seed.name);
        setActiveSeedIdStorage(seed.id);
        setMessage(`Loaded: ${seed.name}`);
        trackGaEvent("menu", "load seed state");
    };

    const deleteSelectedSeed = () => {
        if (!selectedSeedId) {
            setMessage("Select a seed to delete");
            return;
        }
        const store = getSeedStore();
        const seed = store.seeds.find(s => s.id === selectedSeedId);
        if (!seed) {
            refreshSeeds();
            return;
        }
        if (!window.confirm(`Delete seed "${seed.name}"?`)) {
            return;
        }
        store.seeds = store.seeds.filter(s => s.id !== selectedSeedId);
        saveSeedStore(store);
        setSelectedSeedId("");
        setActiveSeedIdStorage("");
        refreshSeeds();
        setMessage("Seed deleted");
        trackGaEvent("menu", "delete seed state");
    };

    const setAppState = state => {
        props.importState(state);
    };

    const setVanillaHyrule = () => {
        if (!window.confirm("Are you sure? This will remove all current settings.")) {
            return;
        }
        setAppState(VanillaHyrule);
        setMessage("Vanilla Hyrule loaded");
        trackGaEvent("menu", "set vanilla hyrule");
    };

    return (
        <div ref={menuRef} className="navbar is-fixed-top is-dark">
            <div style={{ width: "100%", maxWidth: "1000px", margin: "auto" }}>
                <nav>
                    <h1 className="is-size-4 navbar-item has-text-white has-text-weight-bold">
                        ZOoTR Entrance Tracker {showTracker ? <span className="tracker-summary-pill">({trackerSummary?.checked || 0}/{trackerSummary?.total || 0})</span> : null}
                    </h1>
                </nav>
                {message === "" ?
                    <div className="has-background-dark nav-bottom" style={{ flexDirection: "column", alignItems: "stretch" }}>
                        <div className="nav-bottom-left nav-main-actions">
                            <a href="#vanilla-hyrule" className="nav-bottom-item has-text-light" onClick={setVanillaHyrule}>
                                Vanilla Hyrule
                            </a>
                            <a href="#reset" className="nav-bottom-item has-text-light" onClick={resetState}>
                                Reset
                            </a>
                            <button
                                type="button"
                                className="button is-small is-dark is-outlined seed-bar-toggle"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowSeedBar(!showSeedBar);
                                }}
                            >
                                {showSeedBar ? "Hide Seeds" : `Seeds (${savedSeeds.length})`}
                            </button>
                            <button
                                type="button"
                                className={`button is-small is-dark is-outlined admin-open-button ${showAdmin ? "is-active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    openAdmin();
                                }}
                            >
                                {showAdmin ? "Admin Open" : "Admin"}
                            </button>
                            <a
                                href="https://github.com/brakkum/ZOoTR-Entrance-Tracker"
                                className="nav-bottom-item has-text-grey-light"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackGaEvent("menu", "click github link")}
                            >
                                GitHub
                            </a>
                        </div>
                        <div className={`seed-toolbar ${showSeedBar ? "is-open" : ""}`}>
                            <div className="seed-toolbar-scroll">
                                <input
                                    className="input is-small seed-name-input"
                                    type="text"
                                    placeholder="Seed name"
                                    value={seedName}
                                    onChange={(e) => setSeedName(e.target.value)}
                                />
                                <button className="button is-small is-link is-outlined" onClick={saveCurrentSeed}>Save Seed</button>
                                <div className="select is-small seed-select-wrap">
                                    <select value={selectedSeedId} onChange={(e) => {
                                        setSelectedSeedId(e.target.value);
                                        setActiveSeedIdStorage(e.target.value);
                                    }}>
                                        <option value="">Saved seeds ({savedSeeds.length})</option>
                                        {savedSeeds.map(seed => (
                                            <option key={seed.id} value={seed.id}>{seed.id === selectedSeedId ? `★ ${seed.name}` : seed.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button className="button is-small is-info is-outlined" onClick={loadSelectedSeed}>Load</button>
                                <button className="button is-small is-warning is-outlined" onClick={overwriteSelectedSeed}>Overwrite</button>
                                <button className="button is-small is-link is-outlined" onClick={renameSelectedSeed}>Rename</button>
                                <button className="button is-small is-danger is-outlined" onClick={deleteSelectedSeed}>Delete</button>
                            </div>
                        </div>
                        <div
                            className={`seed-sheet-backdrop ${showSeedBar ? "is-open" : ""}`}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowSeedBar(false);
                            }}
                        />
                        <div
                            className={`seed-sheet ${showSeedBar ? "is-open" : ""}`}
                            style={{ bottom: `calc(${songsHeight}px + 0.75rem)` }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="seed-sheet-header">
                                <button
                                    className="button is-small is-dark is-outlined seed-sheet-close"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowSeedBar(false);
                                    }}
                                    aria-label="Close seeds"
                                >
                                    ✕
                                </button>
                                <div className="seed-sheet-handle" />
                                <strong className="has-text-white seed-sheet-title">Seeds</strong>
                            </div>
                            <div className="seed-sheet-body">
                                <input
                                    className="input is-small seed-name-input seed-sheet-input"
                                    type="text"
                                    placeholder="Seed name"
                                    value={seedName}
                                    onChange={(e) => setSeedName(e.target.value)}
                                />
                                <button className="button is-small is-link is-outlined" onClick={saveCurrentSeed}>Save Seed</button>
                                <div className="select is-small seed-select-wrap seed-sheet-select">
                                    <select value={selectedSeedId} onChange={(e) => {
                                        setSelectedSeedId(e.target.value);
                                        setActiveSeedIdStorage(e.target.value);
                                    }}>
                                        <option value="">Saved seeds ({savedSeeds.length})</option>
                                        {savedSeeds.map(seed => (
                                            <option key={seed.id} value={seed.id}>{seed.id === selectedSeedId ? `★ ${seed.name}` : seed.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="seed-sheet-actions">
                                    <button className="button is-small is-info is-outlined" onClick={loadSelectedSeed}>Load</button>
                                    <button className="button is-small is-warning is-outlined" onClick={overwriteSelectedSeed}>Overwrite</button>
                                    <button className="button is-small is-link is-outlined" onClick={renameSelectedSeed}>Rename</button>
                                    <button className="button is-small is-danger is-outlined" onClick={deleteSelectedSeed}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="nav-bottom-right nav-right">
                        <div className="nav-bottom-item nav-bottom-message is-size-6 has-text-primary has-text-weight-bold">
                            {message}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
