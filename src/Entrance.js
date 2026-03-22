import useHover from "./Hooks/useHover";
import React from "react";

export default function Entrance({ options, entrance, areaName, entranceName, ...props }) {
    const [hoverRef, isHovered] = useHover();
    const isChildSpawn = props.spawnPoints?.child?.area === areaName && props.spawnPoints?.child?.entrance === entranceName;
    const isAdultSpawn = props.spawnPoints?.adult?.area === areaName && props.spawnPoints?.adult?.entrance === entranceName;

    return (
        <div className="entrance">
            <span className={
                "entrance-name is-size-6 has-text-weight-bold " +
                ((entrance.interior === null || entrance.leadsTo === null) ? "has-text-danger" : "")
            }>
                {entranceName}{isChildSpawn ? " (Spawn Child)" : ""}{isAdultSpawn ? " (Spawn Adult)" : ""}
            </span>
            <div className="entrance-spacer"></div>
            {entrance.interior !== undefined && entrance.interior !== null ?
                <div
                    className={
                        "interior-display is-flex " +
                        (
                            entrance.clear !== undefined &&
                                entrance.clear ? "check-cleared " :
                                    !entrance.clear ? "check-not-cleared " :
                                        ""
                        ) +
                        (
                            entrance.clear !== undefined &&
                                isHovered ? "hovered " :
                                    ""
                        )
                    }
                    ref={hoverRef}
                    onClick={() => props.toggleEntranceClear(areaName, entranceName)}
                >
                    <span className="interior has-text-right">
                        {entrance.interior}
                    </span>
                    <div className="delete remove-choice is-pulled-right" onClick={
                        () => props.resetEntrance({ ...entrance, area: areaName, entrance: entranceName })
                    } />
                </div>
                :
                entrance.leadsTo !== undefined && entrance.leadsTo !== null
                    ?
                    <div className="area-display has-text-weight-semibold is-flex">
                        <div className="area-display-entrance">
                            <div>
                                {entrance.leadsTo.area}
                            </div>
                            <div className=" is-size-7 has-text-weight-normal">
                                {entrance.leadsTo.entrance} Entrance
                            </div>
                        </div>
                        <span className="delete remove-choice is-pulled-right" onClick={() =>
                            props.resetEntrance(
                                {
                                    ...entrance,
                                    area: areaName,
                                    entrance: entranceName
                                }
                            )
                        } />
                    </div>
                    :
                    <div className="select is-small entrance-select">
                        <select value="Not Checked" onChange={event =>
                            props.setEntrance(
                                {
                                    area: areaName,
                                    entrance: entranceName,
                                    type: entrance.type
                                },
                                JSON.parse(event.target.value)
                            )
                        }>
                            <option value="Not Checked">Not Checked</option>
                            {options instanceof Array ?
                                options.sort().map((interiorName, i) => {
                                    return <option key={i} value={JSON.stringify({ "interior": interiorName })}>
                                        {interiorName}
                                    </option>
                                })
                                :
                                Object.keys(options).sort().map((optgroupArea, i) => {
                                    if (options[optgroupArea].length === 0 ||
                                        (options[optgroupArea].length === 1 &&
                                            areaName === optgroupArea &&
                                            options[optgroupArea][0] === entranceName)) {
                                        return null;
                                    }
                                    return <optgroup
                                        key={i}
                                        label={optgroupArea}
                                    >
                                        {options[optgroupArea].sort().map((optgroupEntrance, j) => {
                                            if (areaName === optgroupArea && entranceName === optgroupEntrance) {
                                                return null;
                                            }
                                            return <option
                                                key={j}
                                                value={JSON.stringify({
                                                    area: optgroupArea,
                                                    entrance: optgroupEntrance
                                                })}
                                            >
                                                {optgroupEntrance}
                                            </option>
                                        })}
                                    </optgroup>
                                })
                            }
                        </select>
                    </div>
            }
        </div>
    )
}
