import React, { useState } from "react";

export default function PromptForLocationEntrance({ locationToPromptFor, showInitialAgeCheck, availableEntrances, startAsChild, type, ...props }) {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedStartAge, setSelectedStartAge] = useState(startAsChild ? "child" : "adult");
    const isSpawnPrompt = locationToPromptFor === "__spawn__";
    const isModal = !!props.modal;

    const setInteriorToAreaAndEntrance = () => {
        if (selectedLocation === "") {
            return;
        }
        if (isSpawnPrompt) {
            props.setSpawnPoint(selectedStartAge, JSON.parse(selectedLocation));
            if (props.onClose) {
                props.onClose();
            }
        } else {
            props.setEntrance(JSON.parse(selectedLocation), { interior: locationToPromptFor });
        }
        setSelectedLocation("");
    };

    const content = (
        <div className="prompt card has-background-dark">
            <div className="prompt-field column is-full">
                <h5 className="prompt-field is-size-5 has-text-centered prompt-question">
                    {isSpawnPrompt ? "Choose your start spawn" : `Where is ${locationToPromptFor}?`}
                </h5>
            </div>
            <div className="prompt-field prompt-select-field column is-full is-centered">
                <div className="select prompt-select is-fullwidth">
                    <select value={selectedLocation} onChange={event => setSelectedLocation(event.target.value)}>
                        <option value="">Choose entrance...</option>
                        {Object.keys(availableEntrances).sort().map((optgroupArea, i) => {
                            if (availableEntrances[optgroupArea].length === 0) {
                                return null;
                            }
                            return (
                                <optgroup key={i} label={optgroupArea}>
                                    {availableEntrances[optgroupArea].sort().map((optgroupEntrance, j) => (
                                        <option
                                            key={j}
                                            value={JSON.stringify({ area: optgroupArea, entrance: optgroupEntrance, type })}
                                        >
                                            {optgroupEntrance}
                                        </option>
                                    ))}
                                </optgroup>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="prompt-field has-text-centered column">
                <button className="button is-small control" onClick={setInteriorToAreaAndEntrance}>
                    {isSpawnPrompt ? `Set ${selectedStartAge === "child" ? "Child" : "Adult"} Spawn` : `Add ${locationToPromptFor}`}
                </button>
            </div>
            {showInitialAgeCheck && (
                <div className="prompt-field has-text-centered column">
                    {isSpawnPrompt ? (
                        <div className="buttons is-centered are-small">
                            <button className={`button is-small ${selectedStartAge === "child" ? "is-link" : ""}`} onClick={() => { setSelectedStartAge("child"); props.setStartAsChild(true); }}>
                                Child Start
                            </button>
                            <button className={`button is-small ${selectedStartAge === "adult" ? "is-link" : ""}`} onClick={() => { setSelectedStartAge("adult"); props.setStartAsChild(false); }}>
                                Adult Start
                            </button>
                        </div>
                    ) : (
                        <button className="button is-small" onClick={props.toggleStartAsChild}>
                            Start as {startAsChild ? "Adult" : "Child"}
                        </button>
                    )}
                </div>
            )}
            {isModal && (
                <div className="prompt-field has-text-centered column">
                    <button className="button is-small is-dark is-outlined" onClick={() => { if (props.onClose) { props.onClose(); } }}>
                        Close
                    </button>
                </div>
            )}
        </div>
    );

    if (!isModal) {
        return content;
    }

    return (
        <div className="prompt-modal-overlay" onClick={() => { if (props.onClose) { props.onClose(); } }}>
            <div className="prompt-modal-shell" onClick={(e) => e.stopPropagation()}>
                {content}
            </div>
        </div>
    );
}
