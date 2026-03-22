import React, { useEffect, useMemo, useState } from "react";
import EntranceTypes from "./DataObjects/EntranceTypes";

const USERS_KEY = "zootr-admin-users-v1";

function getUsers() {
    try {
        const raw = window.localStorage.getItem(USERS_KEY);
        if (!raw) {
            const initial = [{ username: "admin", password: "admin" }];
            window.localStorage.setItem(USERS_KEY, JSON.stringify(initial));
            return initial;
        }
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) {
            return [{ username: "admin", password: "admin" }];
        }
        return parsed;
    } catch (e) {
        return [{ username: "admin", password: "admin" }];
    }
}

function saveUsers(users) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export default function AdminModal({ isOpen, onClose, trackerConfig, onSaveConfig, onLoadBlobConfig, onPublishBlobConfig }) {
    const [users, setUsers] = useState(getUsers());
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginUser, setLoginUser] = useState("admin");
    const [loginPass, setLoginPass] = useState("admin");
    const [loginError, setLoginError] = useState("");
    const [view, setView] = useState("entrances");
    const [draftConfig, setDraftConfig] = useState(() => clone(trackerConfig));
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedEntrance, setSelectedEntrance] = useState("");
    const [selectedTrackerItem, setSelectedTrackerItem] = useState("");
    const [regionNameInput, setRegionNameInput] = useState("");
    const [entranceNameInput, setEntranceNameInput] = useState("");
    const [entranceTypeInput, setEntranceTypeInput] = useState(EntranceTypes.Overworld);
    const [entranceDisplayInput, setEntranceDisplayInput] = useState("");
    const [trackerItemInput, setTrackerItemInput] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [selectedUser, setSelectedUser] = useState("admin");
    const [blobStatus, setBlobStatus] = useState("");

    const regionNames = useMemo(
        () => Object.keys(draftConfig.hyrule || {}).sort((a, b) => a.localeCompare(b)),
        [draftConfig]
    );

    const activeRegion = selectedRegion || regionNames[0] || "";
    const activeEntrances = useMemo(
        () => activeRegion ? Object.keys(draftConfig.hyrule?.[activeRegion]?.entrances || {}).sort((a, b) => a.localeCompare(b)) : [],
        [draftConfig, activeRegion]
    );
    const activeTrackerItems = useMemo(
        () => activeRegion ? [...(draftConfig.locationTrackerData?.[activeRegion] || [])].sort((a, b) => a.name.localeCompare(b.name)) : [],
        [draftConfig, activeRegion]
    );

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const nextConfig = clone(trackerConfig);
        const firstRegion = Object.keys(nextConfig.hyrule || {}).sort((a, b) => a.localeCompare(b))[0] || "";
        setDraftConfig(nextConfig);
        setSelectedRegion(prev => (prev && nextConfig.hyrule?.[prev]) ? prev : firstRegion);
        setSelectedEntrance("");
        setSelectedTrackerItem("");
        setRegionNameInput("");
        setEntranceNameInput("");
        setEntranceTypeInput(EntranceTypes.Overworld);
        setEntranceDisplayInput("");
        setTrackerItemInput("");
        setBlobStatus("");
        setView("entrances");
    }, [isOpen, trackerConfig]);

    useEffect(() => {
        if (!selectedRegion && regionNames.length) {
            setSelectedRegion(regionNames[0]);
        }
    }, [regionNames, selectedRegion]);

    const updateConfig = (updater) => {
        setDraftConfig(prev => clone(updater(clone(prev))));
    };

    const startNewEntrance = () => {
        setView("entrances");
        setSelectedEntrance("");
        setEntranceNameInput("");
        setEntranceDisplayInput("");
        setEntranceTypeInput(EntranceTypes.Overworld);
    };

    const startNewTrackerItem = () => {
        setView("tracker");
        setSelectedTrackerItem("");
        setTrackerItemInput("");
    };

    const handleSelectRegion = (region) => {
        setSelectedRegion(region);
        setSelectedEntrance("");
        setSelectedTrackerItem("");
        setRegionNameInput(region);
        if (view === "users" || view === "blob") {
            setView("entrances");
        }
    };

    const selectEntrance = (name) => {
        const entrance = draftConfig.hyrule?.[activeRegion]?.entrances?.[name];
        setView("entrances");
        setSelectedEntrance(name);
        setEntranceNameInput(name);
        setEntranceTypeInput(entrance?.type || EntranceTypes.Overworld);
        setEntranceDisplayInput(entrance?.display || "");
    };

    const selectTrackerItem = (name) => {
        setView("tracker");
        setSelectedTrackerItem(name);
        setTrackerItemInput(name);
    };

    if (!isOpen) return null;

    const handleLogin = () => {
        const match = users.find(u => u.username === loginUser && u.password === loginPass);
        if (!match) {
            setLoginError("Invalid login");
            return;
        }
        setIsLoggedIn(true);
        setLoginError("");
        const firstRegion = Object.keys(trackerConfig.hyrule || {}).sort((a, b) => a.localeCompare(b))[0] || "";
        setSelectedRegion(firstRegion);
        setView("entrances");
    };

    const addRegion = () => {
        const name = regionNameInput.trim();
        if (!name || draftConfig.hyrule[name]) return;
        updateConfig(cfg => {
            cfg.hyrule[name] = {
                colors: ["light", "dark"],
                isAccessible: false,
                isExpanded: true,
                entrances: {}
            };
            cfg.locationTrackerData[name] = [];
            return cfg;
        });
        setSelectedRegion(name);
        setRegionNameInput(name);
        setView("region");
    };

    const renameRegion = () => {
        const name = regionNameInput.trim();
        if (!activeRegion || !name || name === activeRegion || draftConfig.hyrule[name]) return;
        updateConfig(cfg => {
            cfg.hyrule[name] = cfg.hyrule[activeRegion];
            delete cfg.hyrule[activeRegion];
            cfg.locationTrackerData[name] = cfg.locationTrackerData[activeRegion] || [];
            delete cfg.locationTrackerData[activeRegion];
            Object.keys(cfg.hyrule).forEach(area => {
                const entrances = cfg.hyrule[area].entrances || {};
                if (entrances[activeRegion] && entrances[activeRegion].type === EntranceTypes.Overworld) {
                    entrances[name] = entrances[activeRegion];
                    delete entrances[activeRegion];
                }
            });
            return cfg;
        });
        setSelectedRegion(name);
        setRegionNameInput(name);
    };

    const deleteRegion = () => {
        if (!activeRegion || !window.confirm(`Delete region ${activeRegion}?`)) return;
        updateConfig(cfg => {
            delete cfg.hyrule[activeRegion];
            delete cfg.locationTrackerData[activeRegion];
            Object.keys(cfg.hyrule).forEach(area => {
                delete cfg.hyrule[area].entrances?.[activeRegion];
            });
            return cfg;
        });
        const remaining = regionNames.filter(name => name !== activeRegion);
        setSelectedRegion(remaining[0] || "");
        setSelectedEntrance("");
        setSelectedTrackerItem("");
        setRegionNameInput("");
        setView("entrances");
    };

    const addOrUpdateEntrance = () => {
        const name = entranceNameInput.trim();
        if (!activeRegion || !name) return;
        updateConfig(cfg => {
            const region = cfg.hyrule[activeRegion];
            const existing = selectedEntrance && region.entrances[selectedEntrance] ? region.entrances[selectedEntrance] : {};
            if (selectedEntrance && selectedEntrance !== name) {
                delete region.entrances[selectedEntrance];
            }
            region.entrances[name] = {
                ...existing,
                type: entranceTypeInput,
                display: entranceDisplayInput.trim() || undefined,
                clear: existing.clear || false,
                leadsTo: existing.leadsTo || null,
                interior: existing.interior || null
            };
            return cfg;
        });
        setSelectedEntrance(name);
    };

    const deleteEntrance = () => {
        if (!activeRegion || !selectedEntrance) return;
        updateConfig(cfg => {
            delete cfg.hyrule[activeRegion].entrances[selectedEntrance];
            return cfg;
        });
        startNewEntrance();
    };

    const addOrUpdateTrackerItem = () => {
        const name = trackerItemInput.trim();
        if (!activeRegion || !name) return;
        updateConfig(cfg => {
            const items = cfg.locationTrackerData[activeRegion] || [];
            const idx = items.findIndex(i => i.name === selectedTrackerItem);
            if (idx >= 0) {
                items[idx] = { ...items[idx], name };
            } else {
                items.push({ name, defaultChecked: false, meta: "FALSE" });
            }
            cfg.locationTrackerData[activeRegion] = items;
            return cfg;
        });
        setSelectedTrackerItem(name);
    };

    const deleteTrackerItem = () => {
        if (!activeRegion || !selectedTrackerItem) return;
        updateConfig(cfg => {
            cfg.locationTrackerData[activeRegion] = (cfg.locationTrackerData[activeRegion] || []).filter(i => i.name !== selectedTrackerItem);
            return cfg;
        });
        startNewTrackerItem();
    };

    const addUser = () => {
        const username = newUsername.trim();
        const password = newPassword.trim();
        if (!username || !password || users.some(u => u.username === username)) return;
        const next = [...users, { username, password }];
        setUsers(next);
        saveUsers(next);
        setNewUsername("");
        setNewPassword("");
    };

    const updateUserPassword = () => {
        const password = newPassword.trim();
        if (!selectedUser || !password) return;
        const next = users.map(u => u.username === selectedUser ? { ...u, password } : u);
        setUsers(next);
        saveUsers(next);
        setNewPassword("");
    };

    const deleteUser = () => {
        if (!selectedUser || selectedUser === "admin") return;
        const next = users.filter(u => u.username !== selectedUser);
        setUsers(next);
        saveUsers(next);
        setSelectedUser("admin");
    };

    const saveConfig = () => {
        onSaveConfig(clone(draftConfig));
    };

    const saveConfigAndClose = () => {
        saveConfig();
        onClose();
    };

    const loadFromBlob = async () => {
        setBlobStatus("Loading config from blob...");
        const result = await onLoadBlobConfig();
        if (!result.ok) {
            setBlobStatus(result.error || "Blob load failed");
            return;
        }
        setDraftConfig(clone(result.config));
        const firstRegion = Object.keys(result.config?.hyrule || {}).sort((a, b) => a.localeCompare(b))[0] || "";
        setSelectedRegion(firstRegion);
        setSelectedEntrance("");
        setSelectedTrackerItem("");
        setBlobStatus("Blob config loaded");
    };

    const publishToBlob = async () => {
        setBlobStatus("Publishing config to blob...");
        const result = await onPublishBlobConfig(clone(draftConfig));
        if (!result.ok) {
            setBlobStatus(result.error || "Blob publish failed");
            return;
        }
        onSaveConfig(clone(draftConfig));
        setBlobStatus(`Published: ${result.updatedAt}`);
    };

    const renderMainContent = () => {
        if (view === "users") {
            return (
                <div className="admin-editor-card">
                    <p className="admin-editor-kicker">Workspace</p>
                    <h2 className="title is-4 admin-editor-title">User Access</h2>
                    <div className="admin-form-grid admin-editor-form-grid">
                        <div className="field">
                            <label className="label">Selected User</label>
                            <div className="select is-fullwidth">
                                <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
                                    {users.map(user => <option key={user.username} value={user.username}>{user.username}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">New Username</label>
                            <input className="input" value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder="New username" />
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <input className="input" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Password" />
                        </div>
                    </div>
                    <div className="buttons admin-action-row">
                        <button className="button is-link" onClick={addUser}>Add User</button>
                        <button className="button is-warning is-light" onClick={updateUserPassword}>Update Password</button>
                        <button className="button is-danger is-light" onClick={deleteUser}>Delete User</button>
                    </div>
                </div>
            );
        }

        if (view === "blob") {
            return (
                <div className="admin-editor-card">
                    <p className="admin-editor-kicker">Workspace</p>
                    <h2 className="title is-4 admin-editor-title">Blob Sync</h2>
                    <p className="admin-editor-copy">Load or publish the current tracker config via Vercel Blob.</p>
                    <div className="buttons admin-action-row">
                        <button className="button is-link is-light" onClick={loadFromBlob}>Load from Blob</button>
                        <button className="button is-primary" onClick={publishToBlob}>Publish to Blob</button>
                    </div>
                    {blobStatus ? <div className="notification is-dark admin-inline-note mt-4">{blobStatus}</div> : null}
                </div>
            );
        }

        if (view === "region") {
            return (
                <div className="admin-editor-stack">
                    <div className="admin-editor-card">
                        <p className="admin-editor-kicker">Regions</p>
                        <h2 className="title is-4 admin-editor-title">Manage Region</h2>
                        <div className="admin-form-grid admin-editor-form-grid">
                            <div className="field admin-form-span-2">
                                <label className="label">Region Name</label>
                                <input
                                    className="input"
                                    value={regionNameInput}
                                    onChange={e => setRegionNameInput(e.target.value)}
                                    placeholder="Region name"
                                />
                            </div>
                        </div>
                        <div className="buttons admin-action-row">
                            <button className="button is-link" onClick={addRegion}>Add New Region</button>
                            <button className="button is-warning is-light" onClick={renameRegion} disabled={!activeRegion}>Rename Selected Region</button>
                            <button className="button is-danger is-light" onClick={deleteRegion} disabled={!activeRegion}>Delete Selected Region</button>
                        </div>
                    </div>
                    <div className="admin-editor-card">
                        <p className="admin-editor-kicker">Current Selection</p>
                        <h3 className="title is-5 admin-editor-title">{activeRegion || "No region selected"}</h3>
                        <div className="admin-stat-grid">
                            <div className="admin-stat-card">
                                <span className="admin-stat-value">{activeEntrances.length}</span>
                                <span className="admin-stat-label">Entrances</span>
                            </div>
                            <div className="admin-stat-card">
                                <span className="admin-stat-value">{activeTrackerItems.length}</span>
                                <span className="admin-stat-label">Tracker Items</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (view === "tracker") {
            return (
                <div className="admin-editor-card">
                    <p className="admin-editor-kicker">Region · {activeRegion}</p>
                    <h2 className="title is-4 admin-editor-title">{selectedTrackerItem || "New Tracker Item"}</h2>
                    <p className="admin-editor-copy">Define the tracker entries that should appear for this region.</p>
                    <div className="admin-form-grid admin-editor-form-grid">
                        <div className="field admin-form-span-2">
                            <label className="label">Tracker Item Name</label>
                            <input className="input" value={trackerItemInput} onChange={e => setTrackerItemInput(e.target.value)} placeholder="Tracker item name" />
                        </div>
                    </div>
                    <div className="buttons admin-action-row">
                        <button className="button is-link" onClick={addOrUpdateTrackerItem}>{selectedTrackerItem ? "Update Item" : "Add Item"}</button>
                        <button className="button is-light" onClick={startNewTrackerItem}>New Item</button>
                        <button className="button is-danger is-light" onClick={deleteTrackerItem} disabled={!selectedTrackerItem}>Delete Item</button>
                    </div>
                </div>
            );
        }

        return (
            <div className="admin-editor-card">
                <p className="admin-editor-kicker">Region · {activeRegion}</p>
                <h2 className="title is-4 admin-editor-title">{selectedEntrance || "New Entrance"}</h2>
                <p className="admin-editor-copy">Edit entrances for the selected region. Pick one from the middle list or create a new one.</p>
                <div className="admin-form-grid admin-editor-form-grid">
                    <div className="field admin-form-span-2">
                        <label className="label">Entrance Name</label>
                        <input className="input" value={entranceNameInput} onChange={e => setEntranceNameInput(e.target.value)} placeholder="Entrance name" />
                    </div>
                    <div className="field">
                        <label className="label">Type</label>
                        <div className="select is-fullwidth">
                            <select value={entranceTypeInput} onChange={e => setEntranceTypeInput(e.target.value)}>
                                {Object.values(EntranceTypes).map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Display Label</label>
                        <input className="input" value={entranceDisplayInput} onChange={e => setEntranceDisplayInput(e.target.value)} placeholder="Optional display label" />
                    </div>
                </div>
                <div className="buttons admin-action-row">
                    <button className="button is-link" onClick={addOrUpdateEntrance}>{selectedEntrance ? "Update Entrance" : "Add Entrance"}</button>
                    <button className="button is-light" onClick={startNewEntrance}>New Entrance</button>
                    <button className="button is-danger is-light" onClick={deleteEntrance} disabled={!selectedEntrance}>Delete Entrance</button>
                </div>
            </div>
        );
    };

    return (
        <div className="admin-page">
            {!isLoggedIn ? (
                <div className="admin-login-shell">
                    <div className="admin-login-card">
                        <p className="admin-editor-kicker">Admin</p>
                        <h2 className="title is-4 admin-editor-title">Sign in</h2>
                        <div className="admin-form-grid admin-editor-form-grid">
                            <div className="field admin-form-span-2">
                                <label className="label">Username</label>
                                <input className="input" value={loginUser} onChange={e => setLoginUser(e.target.value)} placeholder="Username" />
                            </div>
                            <div className="field admin-form-span-2">
                                <label className="label">Password</label>
                                <input className="input" type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="Password" />
                            </div>
                        </div>
                        {loginError ? <p className="has-text-danger mt-2">{loginError}</p> : null}
                        <div className="buttons admin-action-row admin-login-actions">
                            <button className="button is-link" onClick={handleLogin}>Login</button>
                            <button className="button" onClick={onClose}>Back</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="admin-shell">
                    <aside className="admin-region-sidebar">
                        <div className="admin-sidebar-head">
                            <p className="admin-sidebar-kicker">Navigation</p>
                            <h2 className="title is-5 has-text-white mb-0">Regions</h2>
                        </div>
                        <div className="admin-region-list">
                            {regionNames.map(region => (
                                <button
                                    key={region}
                                    type="button"
                                    className={`admin-nav-item ${region === activeRegion ? "is-active" : ""}`}
                                    onClick={() => handleSelectRegion(region)}
                                >
                                    <span>{region}</span>
                                    <span className="admin-nav-meta">{Object.keys(draftConfig.hyrule?.[region]?.entrances || {}).length}</span>
                                </button>
                            ))}
                        </div>
                        <button type="button" className="button is-link is-light is-fullwidth mt-3 admin-sidebar-button" onClick={() => {
                            setView("region");
                            setRegionNameInput("");
                        }}>
                            + New Region
                        </button>
                    </aside>

                    <aside className="admin-subnav-sidebar">
                        <div className="admin-sidebar-head">
                            <p className="admin-sidebar-kicker">Selected Region</p>
                            <h3 className="title is-6 has-text-white mb-0">{activeRegion || "No region"}</h3>
                        </div>

                        <div className="admin-side-section">
                            <p className="admin-side-label">Region Tools</p>
                            <div className="admin-side-toggle-group">
                                <button type="button" className={`admin-pill ${view === "entrances" ? "is-active" : ""}`} onClick={() => setView("entrances")}>Entrances</button>
                                <button type="button" className={`admin-pill ${view === "tracker" ? "is-active" : ""}`} onClick={() => setView("tracker")}>Tracker Items</button>
                                <button type="button" className={`admin-pill ${view === "region" ? "is-active" : ""}`} onClick={() => {
                                    setView("region");
                                    setRegionNameInput(activeRegion);
                                }}>Region</button>
                            </div>
                        </div>

                        {view === "tracker" ? (
                            <div className="admin-side-section admin-scroll-section">
                                <div className="admin-side-label-row">
                                    <p className="admin-side-label mb-0">Tracker Items</p>
                                    <button type="button" className="admin-mini-action" onClick={startNewTrackerItem}>+ New</button>
                                </div>
                                <div className="admin-subitem-list">
                                    {activeTrackerItems.map(item => (
                                        <button
                                            key={item.name}
                                            type="button"
                                            className={`admin-subitem ${selectedTrackerItem === item.name ? "is-active" : ""}`}
                                            onClick={() => selectTrackerItem(item.name)}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                    {activeTrackerItems.length === 0 ? <p className="admin-empty-copy">No tracker items yet.</p> : null}
                                </div>
                            </div>
                        ) : (
                            <div className="admin-side-section admin-scroll-section">
                                <div className="admin-side-label-row">
                                    <p className="admin-side-label mb-0">Entrances</p>
                                    <button type="button" className="admin-mini-action" onClick={startNewEntrance}>+ New</button>
                                </div>
                                <div className="admin-subitem-list">
                                    {activeEntrances.map(name => (
                                        <button
                                            key={name}
                                            type="button"
                                            className={`admin-subitem ${selectedEntrance === name ? "is-active" : ""}`}
                                            onClick={() => selectEntrance(name)}
                                        >
                                            {name}
                                        </button>
                                    ))}
                                    {activeEntrances.length === 0 ? <p className="admin-empty-copy">No entrances yet.</p> : null}
                                </div>
                            </div>
                        )}

                        <div className="admin-side-section">
                            <p className="admin-side-label">Workspace</p>
                            <div className="admin-side-stack">
                                <button type="button" className={`admin-nav-item compact ${view === "users" ? "is-active" : ""}`} onClick={() => setView("users")}>User Access</button>
                                <button type="button" className={`admin-nav-item compact ${view === "blob" ? "is-active" : ""}`} onClick={() => setView("blob")}>Blob Sync</button>
                            </div>
                        </div>
                    </aside>

                    <section className="admin-main">
                        <div className="admin-main-header">
                            <div className="admin-main-title-block">
                                <p className="admin-editor-kicker">ZOoTR Admin</p>
                                <h1 className="title is-3 admin-main-title">Config Editor</h1>
                            </div>
                            <div className="buttons admin-header-actions">
                                <button className="button is-primary" onClick={saveConfig}>Save Config</button>
                                <button className="button is-link is-light" onClick={saveConfigAndClose}>Save & Close</button>
                                <button className="button" onClick={onClose}>Close</button>
                            </div>
                            <p className="admin-editor-copy admin-header-copy">Left: choose a region. Middle: choose entrances, tracker items, or workspace tools. Center: edit the selected item.</p>
                        </div>
                        {renderMainContent()}
                    </section>
                </div>
            )}
        </div>
    );
}
