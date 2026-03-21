import React, { useMemo, useState } from "react";
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
    const [tab, setTab] = useState("regions");
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

    const regionNames = useMemo(() => Object.keys(draftConfig.hyrule || {}), [draftConfig]);
    const activeRegion = selectedRegion || regionNames[0] || "";
    const activeEntrances = activeRegion ? Object.keys(draftConfig.hyrule?.[activeRegion]?.entrances || {}) : [];
    const activeTrackerItems = activeRegion ? (draftConfig.locationTrackerData?.[activeRegion] || []) : [];

    if (!isOpen) return null;

    const handleLogin = () => {
        const match = users.find(u => u.username === loginUser && u.password === loginPass);
        if (!match) {
            setLoginError("Invalid login");
            return;
        }
        setIsLoggedIn(true);
        setLoginError("");
        setDraftConfig(clone(trackerConfig));
        const firstRegion = Object.keys(trackerConfig.hyrule || {})[0] || "";
        setSelectedRegion(firstRegion);
    };

    const updateConfig = (updater) => {
        setDraftConfig(prev => clone(updater(clone(prev))));
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
        setRegionNameInput("");
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
        setRegionNameInput("");
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
        setSelectedRegion("");
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
                display: entranceDisplayInput || undefined,
                clear: false,
                leadsTo: existing.leadsTo || null,
                interior: existing.interior || null
            };
            return cfg;
        });
        setSelectedEntrance(name);
        setEntranceNameInput("");
        setEntranceDisplayInput("");
    };

    const deleteEntrance = () => {
        if (!activeRegion || !selectedEntrance) return;
        updateConfig(cfg => {
            delete cfg.hyrule[activeRegion].entrances[selectedEntrance];
            return cfg;
        });
        setSelectedEntrance("");
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
        setTrackerItemInput("");
    };

    const deleteTrackerItem = () => {
        if (!activeRegion || !selectedTrackerItem) return;
        updateConfig(cfg => {
            cfg.locationTrackerData[activeRegion] = (cfg.locationTrackerData[activeRegion] || []).filter(i => i.name !== selectedTrackerItem);
            return cfg;
        });
        setSelectedTrackerItem("");
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

    const saveConfigAndClose = () => {
        onSaveConfig(clone(draftConfig));
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
        const firstRegion = Object.keys(result.config?.hyrule || {})[0] || "";
        setSelectedRegion(firstRegion);
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

    return (
        <div className="tracker-modal-overlay" onClick={onClose}>
            <div className="tracker-modal-card admin-modal-card" onClick={(e) => e.stopPropagation()}>
                {!isLoggedIn ? (
                    <div className="tracker-modal-content admin-login-panel">
                        <h3 className="title is-4">Admin Login</h3>
                        <input className="input" value={loginUser} onChange={e => setLoginUser(e.target.value)} placeholder="Username" />
                        <input className="input" type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="Password" />
                        {loginError ? <p className="has-text-danger">{loginError}</p> : null}
                        <div className="buttons">
                            <button className="button is-link" onClick={handleLogin}>Login</button>
                            <button className="button" onClick={onClose}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="tracker-modal-header">
                            <div>
                                <h3 className="title is-5 has-text-white tracker-modal-title">Admin</h3>
                                <p className="tracker-modal-subtitle">Edit config + users</p>
                            </div>
                            <button type="button" className="button is-small is-dark is-outlined tracker-modal-close" onClick={onClose}>✕</button>
                        </div>
                        <div className="tracker-modal-content admin-content">
                            <div className="tabs is-boxed is-small">
                                <ul>
                                    <li className={tab === "regions" ? "is-active" : ""}><a href="#regions" onClick={e => { e.preventDefault(); setTab("regions"); }}>Regions</a></li>
                                    <li className={tab === "entrances" ? "is-active" : ""}><a href="#entrances" onClick={e => { e.preventDefault(); setTab("entrances"); }}>Entrances</a></li>
                                    <li className={tab === "tracker" ? "is-active" : ""}><a href="#tracker" onClick={e => { e.preventDefault(); setTab("tracker"); }}>Tracker Items</a></li>
                                    <li className={tab === "users" ? "is-active" : ""}><a href="#users" onClick={e => { e.preventDefault(); setTab("users"); }}>User Access</a></li>
                                    <li className={tab === "blob" ? "is-active" : ""}><a href="#blob" onClick={e => { e.preventDefault(); setTab("blob"); }}>Blob</a></li>
                                </ul>
                            </div>

                            {(tab === "regions" || tab === "entrances" || tab === "tracker") && (
                                <div className="field">
                                    <label className="label">Region</label>
                                    <div className="select is-fullwidth">
                                        <select value={activeRegion} onChange={e => setSelectedRegion(e.target.value)}>
                                            {regionNames.map(name => <option key={name} value={name}>{name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            )}

                            {tab === "regions" && (
                                <div className="admin-grid">
                                    <input className="input" value={regionNameInput} onChange={e => setRegionNameInput(e.target.value)} placeholder="Region name" />
                                    <div className="buttons">
                                        <button className="button is-link is-light" onClick={addRegion}>Add</button>
                                        <button className="button is-warning is-light" onClick={renameRegion}>Rename</button>
                                        <button className="button is-danger is-light" onClick={deleteRegion}>Delete</button>
                                    </div>
                                </div>
                            )}

                            {tab === "entrances" && activeRegion && (
                                <div className="admin-grid">
                                    <div className="select is-fullwidth">
                                        <select value={selectedEntrance} onChange={e => {
                                            const value = e.target.value;
                                            setSelectedEntrance(value);
                                            const ent = draftConfig.hyrule[activeRegion].entrances[value];
                                            setEntranceNameInput(value);
                                            setEntranceTypeInput(ent?.type || EntranceTypes.Overworld);
                                            setEntranceDisplayInput(ent?.display || "");
                                        }}>
                                            <option value="">Select entrance</option>
                                            {activeEntrances.map(name => <option key={name} value={name}>{name}</option>)}
                                        </select>
                                    </div>
                                    <input className="input" value={entranceNameInput} onChange={e => setEntranceNameInput(e.target.value)} placeholder="Entrance name" />
                                    <div className="select is-fullwidth">
                                        <select value={entranceTypeInput} onChange={e => setEntranceTypeInput(e.target.value)}>
                                            {Object.values(EntranceTypes).map(type => <option key={type} value={type}>{type}</option>)}
                                        </select>
                                    </div>
                                    <input className="input" value={entranceDisplayInput} onChange={e => setEntranceDisplayInput(e.target.value)} placeholder="Display label (optional)" />
                                    <div className="buttons">
                                        <button className="button is-link is-light" onClick={addOrUpdateEntrance}>Add / Update</button>
                                        <button className="button is-danger is-light" onClick={deleteEntrance}>Delete</button>
                                    </div>
                                </div>
                            )}

                            {tab === "tracker" && activeRegion && (
                                <div className="admin-grid">
                                    <div className="select is-fullwidth">
                                        <select value={selectedTrackerItem} onChange={e => {
                                            const value = e.target.value;
                                            setSelectedTrackerItem(value);
                                            setTrackerItemInput(value);
                                        }}>
                                            <option value="">Select tracker item</option>
                                            {activeTrackerItems.map(item => <option key={item.name} value={item.name}>{item.name}</option>)}
                                        </select>
                                    </div>
                                    <input className="input" value={trackerItemInput} onChange={e => setTrackerItemInput(e.target.value)} placeholder="Tracker item name" />
                                    <div className="buttons">
                                        <button className="button is-link is-light" onClick={addOrUpdateTrackerItem}>Add / Update</button>
                                        <button className="button is-danger is-light" onClick={deleteTrackerItem}>Delete</button>
                                    </div>
                                </div>
                            )}

                            {tab === "users" && (
                                <div className="admin-grid">
                                    <div className="select is-fullwidth">
                                        <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
                                            {users.map(user => <option key={user.username} value={user.username}>{user.username}</option>)}
                                        </select>
                                    </div>
                                    <input className="input" value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder="New username" />
                                    <input className="input" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Password" />
                                    <div className="buttons">
                                        <button className="button is-link is-light" onClick={addUser}>Add User</button>
                                        <button className="button is-warning is-light" onClick={updateUserPassword}>Update Password</button>
                                        <button className="button is-danger is-light" onClick={deleteUser}>Delete User</button>
                                    </div>
                                </div>
                            )}

                            {tab === "blob" && (
                                <div className="admin-grid">
                                    <p>Load/publish the current config via Vercel Blob.</p>
                                    <div className="buttons">
                                        <button className="button is-link is-light" onClick={loadFromBlob}>Load from Blob</button>
                                        <button className="button is-primary" onClick={publishToBlob}>Publish to Blob</button>
                                    </div>
                                    {blobStatus ? <p className="has-text-info">{blobStatus}</p> : null}
                                </div>
                            )}

                            <div className="buttons is-right mt-4">
                                <button className="button" onClick={onClose}>Cancel</button>
                                <button className="button is-primary" onClick={saveConfigAndClose}>Save Config</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
