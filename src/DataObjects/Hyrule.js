import OverworldAreas from "./OverworldAreas";
import EntranceTypes from "./EntranceTypes";
import Entrances from "./Entrances";
import Dungeons from "./Dungeons";
import Grottos from "./Grottos";
import Houses from "./Houses";

export default {
    [OverworldAreas["Castle Town Entrance"]]: {
        "colors": [
            "#dddddd",
            "#bbbacd",
            "#cdcdcd"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Hyrule Field"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas.Market]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Houses["Guard Hut/Poe Collector"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Death Mountain Crater"]]: {
        "colors": [
            "#7c451c",
            "#901f11"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Death Mountain Trail"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Goron City"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Grottos["Boulder Near Death Mountain Trail"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos.Grotto,
                "clear": false,
                "interior": null
            },
            [Grottos["Boulder Near Goron City"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["3 Scrubs"],
                "clear": false,
                "interior": null
            },
            [Houses["Great Fairy's Fountain"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Dungeons["Fire Temple"]]: {
                "type": EntranceTypes.Dungeon,
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Death Mountain Trail"]]: {
        "colors": [
            "#a0793c",
            "#93584a"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Kakariko Village"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Dungeons["Dodongo's Cavern"]]: {
                "type": EntranceTypes.Dungeon,
                "clear": false,
                "interior": null
            },
            [OverworldAreas["Goron City"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Grottos["Song of Storms Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos.Grotto,
                "clear": false,
                "interior": null
            },
            [Grottos["Cow Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "clear": false,
                "interior": null
            },
            [Houses["Great Fairy's Fountain"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [OverworldAreas["Death Mountain Crater"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Entrances["Kaepora Gaebora"]]: {
                "type": EntranceTypes["Kaepora Gaebora"],
                "leadsTo": null
            }
        }
    },
    [OverworldAreas["Desert Colossus"]]: {
        "colors": [
            "#b79f60",
            "#c6b34e",
            "#c1ad96"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [Grottos["Boulder Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["2 Scrubs"],
                "clear": false,
                "interior": null
            },
            [Houses["Great Fairy's Fountain"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Dungeons["Spirit Temple"]]: {
                "type": EntranceTypes.Dungeon,
                "clear": false,
                "interior": null
            },
            [OverworldAreas["Haunted Wasteland"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            }
        }
    },
    [OverworldAreas["Gerudo's Fortress"]]: {
        "colors": [
            "#947d5a",
            "#cbb186"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [Dungeons["Gerudo Training Grounds"]]: {
                "type": EntranceTypes.Dungeon,
                "clear": false,
                "interior": null
            },
            [OverworldAreas["Gerudo Valley"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Haunted Wasteland"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Grottos["Song of Storms Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["Fairy Fountain"],
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Gerudo Valley"]]: {
        "colors": [
            "#946333",
            "#cbc3ae"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "attachedArea": {
            "name": OverworldAreas["Lake Hylia"]
        },
        "entrances": {
            [OverworldAreas["Hyrule Field"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Gerudo's Fortress"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Grottos["Boulder on Ledge"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["Diving Rupee Grotto"],
                "clear": false,
                "interior": null
            },
            [Grottos["Song of Storms Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["2 Scrubs"],
                "clear": false,
                "interior": null
            },
            [Houses["Carpenter Tent"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Goron City"]]: {
        "colors": [
            "#c09557",
            "#c07b50"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Death Mountain Trail"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Death Mountain Crater"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Lost Woods"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Houses.Shop]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Grottos["Open Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["3 Scrubs"],
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas.Graveyard]: {
        "colors": [
            "#6f8367",
            "#836b68",
            "#968299"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Kakariko Village"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null,
            },
            [Dungeons["Shadow Temple"]]: {
                "type": EntranceTypes.Dungeon,
                "clear": false,
                "interior": null
            },
            [Houses["Dampe's Hut"]]: {
                "type": EntranceTypes.House,
                "display": Houses.House,
                "clear": false,
                "interior": null
            },
            [Grottos["Composer Grave"]]: {
                "type": EntranceTypes.Grotto,
                "clear": false,
                "interior": null
            },
            [Grottos["Shield Grave"]]: {
                "type": EntranceTypes.Grotto,
                "clear": false,
                "interior": null
            },
            [Grottos["Redead Grave"]]: {
                "type": EntranceTypes.Grotto,
                "clear": false,
                "interior": null
            },
            [Grottos["Dampe's Grave"]]: {
                "type": EntranceTypes.Grotto,
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Haunted Wasteland"]]: {
        "colors": [
            "#d0b682",
            "#6e6d82"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Gerudo's Fortress"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Desert Colossus"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            }
        }
    },
    [OverworldAreas["Hyrule/Ganon's Castle"]]: {
        "colors": [
            "#a7a4e1",
            "#e9ecee",
            "#964145"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [Houses["Child Great Fairy's Fountain"]]: {
                "type": EntranceTypes.House,
                "display": Houses["Great Fairy's Fountain"],
                "clear": false,
                "interior": null
            },
            [Houses["Adult Great Fairy's Fountain"]]: {
                "type": EntranceTypes.House,
                "display": Houses["Great Fairy's Fountain"],
                "clear": false,
                "interior": null
            },
            [OverworldAreas.Market]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Grottos["Song of Storms Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["Skulltula Grotto"],
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Hyrule Field"]]: {
        "colors": [
            "#7cab61",
            "#c9bc80",
            "#c9bd61"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Lost Woods Bridge"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Zora's River"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Kakariko Village"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Grottos["Tree Near Kakariko Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["Skulltula Grotto"],
                "clear": false,
                "interior": null
            },
            [OverworldAreas["Castle Town Entrance"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Grottos["Boulder Near Castle Town"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos.Grotto,
                "clear": false,
                "interior": null
            },
            [OverworldAreas["Lon Lon Ranch"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Grottos["Boulder Across River"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["Fairy Fountain"],
                "clear": false,
                "interior": null
            },
            [Grottos["Tektite Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["Diving Grotto"],
                "clear": false,
                "interior": null
            },
            [Grottos["Boulder Near Gerudo Valley"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["Cow and Skulltula Grotto"],
                "clear": false,
                "interior": null
            },
            [OverworldAreas["Gerudo Valley"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Lake Hylia"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Grottos["Near Lake Inside Fence Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["1 Scrub"],
                "clear": false,
                "interior": null
            },
            [Grottos["Open Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos.Grotto,
                "clear": false,
                "interior": null
            },
            [Grottos["Boulder in Trees"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos.Grotto,
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Kakariko Village"]]: {
        "colors": [
            "#91aa94",
            "#a5aa9c",
            "#aa9191"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Hyrule Field"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Death Mountain Trail"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas.Graveyard]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Dungeons["Bottom of the Well"]]: {
                "type": EntranceTypes.Dungeon,
                "clear": false,
                "interior": null
            },
            [Houses["Skulltula House"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Houses.Windmill]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Houses["Impa's House Front"]]: {
                "type": EntranceTypes.House,
                "display": Houses.House,
                "clear": false,
                "interior": null
            },
            [Houses["Impa's House Cow"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Houses["Bottom House"]]: {
                "type": EntranceTypes.House,
                "display": Houses.House,
                "clear": false,
                "interior": null
            },
            [Houses["Adult Shooting Gallery"]]: {
                "type": EntranceTypes.House,
                "display": Houses["Adult Shooting Gallery"],
                "clear": false,
                "interior": null
            },
            [Houses.Bazaar]: {
                "type": EntranceTypes.House,
                "display": Houses.Shop,
                "clear": false,
                "interior": null
            },
            [Houses["Potion Shop Back"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Houses["Potion Shop Front"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Houses["Granny's Potion Shop"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Grottos["Open Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos.Grotto,
                "clear": false,
                "interior": null
            },
            [Grottos["Bomb Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["Redead Grotto"],
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Kokiri Forest"]]: {
        "colors": [
            "#82b047",
            "#98b08b",
            "#866f65"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Lost Woods Bridge"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Lost Woods"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Dungeons["Deku Tree"]]: {
                "type": EntranceTypes.Dungeon,
                "clear": false,
                "interior": null
            },
            [Houses["Know-It-All House"]]: {
                "type": EntranceTypes.House,
                "display": Houses.House,
                "clear": false,
                "interior": null
            },
            [Houses["Mido's House"]]: {
                "type": EntranceTypes.House,
                "display": Houses.House,
                "clear": false,
                "interior": null
            },
            [Houses["Link's House"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Houses["Saria's House"]]: {
                "type": EntranceTypes.House,
                "display": Houses.House,
                "clear": false,
                "interior": null
            },
            [Houses["Twins House"]]: {
                "type": EntranceTypes.House,
                "display": Houses.House,
                "clear": false,
                "interior": null
            },
            [Houses.Shop]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Grottos["Song of Storms Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos.Grotto,
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Lake Hylia"]]: {
        "colors": [
            "#888bb0",
            "#8cabb0"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Hyrule Field"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Zora's Domain"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Entrances["Kaepora Gaebora"]]: {
                "type": EntranceTypes["Kaepora Gaebora"],
                "leadsTo": null
            },
            [Grottos.Grave]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["3 Scrubs"],
                "clear": false,
                "interior": null
            },
            [Houses["Lakeside Laboratory"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Houses.Fishing]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Dungeons["Water Temple"]]: {
                "type": EntranceTypes.Dungeon,
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Lon Lon Ranch"]]: {
        "colors": [
            "#c5aa79",
            "#d0bfb2",
            "#8fc771"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Hyrule Field"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Houses["Talon's House"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Houses.Stable]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Houses["Lon Lon Tower"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Grottos["Open Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["3 Scrubs"],
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Lost Woods"]]: {
        "colors": [
            "#51852b",
            "#a4af32"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Kokiri Forest"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Goron City"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Sacred Forest Meadow"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Zora's River"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Grottos["Forest Stage"]]: {
                "type": EntranceTypes.Grotto,
                "clear": false,
                "interior": null
            },
            [Grottos["Boulder Near Goron City"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos.Grotto,
                "clear": false,
                "interior": null
            },
            [Grottos["Boulder Near Sacred Forest Meadow"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["2 Scrubs"],
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Lost Woods Bridge"]]: {
        "colors": [
            "#51852b",
            "#796b4f",
            "#a4af32"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Kokiri Forest"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Hyrule Field"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            }
        }
    },
    [OverworldAreas.Market]: {
        "colors": [
            "#9b9e93",
            "#736c79",
            "#af9084"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Castle Town Entrance"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Temple of Time Entrance"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Hyrule/Ganon's Castle"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Houses.Bazaar]: {
                "type": EntranceTypes.House,
                "display": Houses.Shop,
                "clear": false,
                "interior": null
            },
            [Houses["Potion Shop"]]: {
                "type": EntranceTypes.House,
                "display": Houses.Shop,
                "clear": false,
                "interior": null
            },
            [Houses["Child Shooting Gallery"]]: {
                "type": EntranceTypes.House,
                "display": Houses["Child Shooting Gallery"],
                "clear": false,
                "interior": null
            },
            [Houses["Bombchu Bowling"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Houses["Bombchu Shop"]]: {
                "type": EntranceTypes.House,
                "display": Houses.Shop,
                "clear": false,
                "interior": null
            },
            [Houses["Treasure Box Shop"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            },
            [Houses["Back Alley House"]]: {
                "type": EntranceTypes.House,
                "display": Houses.House,
                "clear": false,
                "interior": null
            },
            [Houses["Mask Shop"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Sacred Forest Meadow"]]: {
        "colors": [
            "#557356",
            "#72c041",
            "#9caf7c"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Lost Woods"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Dungeons["Forest Temple"]]: {
                "type": EntranceTypes.Dungeon,
                "clear": false,
                "interior": null
            },
            [Grottos["Bomb Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["Wolfos Grotto"],
                "clear": false,
                "interior": null
            },
            [Grottos["Open Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["Fairy Fountain"],
                "clear": false,
                "interior": null
            },
            [Grottos["Song of Storms Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["2 Scrubs"],
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Temple of Time Entrance"]]: {
        "colors": [
            "#74856e",
            "#83766a",
            "#d6d5ba"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas.Market]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Houses["Temple of Time"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Zora's Domain"]]: {
        "colors": [
            "#658285",
            "#b9b7ec",
            "#7b6753"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Zora's River"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Zora's Fountain"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Lake Hylia"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Houses.Shop]: {
                "type": EntranceTypes.House,
                "display": Houses.Shop,
                "clear": false,
                "interior": null
            },
            [Grottos["Song of Storms Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["Fairy Fountain"],
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Zora's Fountain"]]: {
        "colors": [
            "#96b0c6",
            "#8e8872"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Zora's Domain"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Dungeons["Jabu Jabu's Belly"]]: {
                "type": EntranceTypes.Dungeon,
                "clear": false,
                "interior": null
            },
            [Dungeons["Ice Cavern"]]: {
                "type": EntranceTypes.Dungeon,
                "clear": false,
                "interior": null
            },
            [Houses["Great Fairy's Fountain"]]: {
                "type": EntranceTypes.House,
                "clear": false,
                "interior": null
            }
        }
    },
    [OverworldAreas["Zora's River"]]: {
        "colors": [
            "#9996c6",
            "#75b46d"
        ],
        "isAccessible": false,
        "isExpanded": true,
        "hasKaeporaLakeHyliaLanding": false,
        "hasKaeporaDeathMountainTrailLanding": false,
        "entrances": {
            [OverworldAreas["Hyrule Field"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Zora's Domain"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [OverworldAreas["Lost Woods"]]: {
                "type": EntranceTypes.Overworld,
                "leadsTo": null
            },
            [Grottos["Song of Storms Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["2 Scrubs"],
                "clear": false,
                "interior": null
            },
            [Grottos["Open Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos.Grotto,
                "clear": false,
                "interior": null
            },
            [Grottos["Boulder Grotto"]]: {
                "type": EntranceTypes.Grotto,
                "display": Grottos["Fairy Fountain"],
                "clear": false,
                "interior": null
            }
        }
    },

    // German house regions imported from checklist
    "Feen-Quelle (Schloss Hyrule)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Feen-Quelle (Schloss Hyrule)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Feen-Quelle (Gebirgspfad)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Feen-Quelle (Gebirgspfad)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Feen-Quelle (Zoras Quelle)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Feen-Quelle (Zoras Quelle)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Feen-Quelle (Wüstenkoloss)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Feen-Quelle (Wüstenkoloss)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Feen-Quelle (Todeskrater)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Feen-Quelle (Todeskrater)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Feen-Quelle (Ganons Schloss)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Feen-Quelle (Ganons Schloss)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Fischweiher": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Fischweiher": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Haus Boris": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Haus Boris": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Haus der allwissenden Brüder": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Haus der allwissenden Brüder": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Haus der Zimmerleute": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Haus der Zimmerleute": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Haus der Zwillinge": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Haus der Zwillinge": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Haus Impa Hühnergehege": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Haus Impa Hühnergehege": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Haus Impa Haupteingang": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Haus Impa Haupteingang": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Haus Link": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Haus Link": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Haus Mido": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Haus Mido": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Haus Nebenstraße (3x Krug)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Haus Nebenstraße (3x Krug)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Haus Nebenstraße (Richard + 1x Kiste)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Haus Nebenstraße (Richard + 1x Kiste)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Haus Salia": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Haus Salia": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Haus Talon": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Haus Talon": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Krabbelminen-Bowling": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Krabbelminen-Bowling": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Labor am See": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Labor am See": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Laden Basar (Kakariko)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Laden Basar (Kakariko)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Laden Basar (Marktplatz)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Laden Basar (Marktplatz)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Laden Goronia": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Laden Goronia": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Laden Hexe Asa": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Laden Hexe Asa": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Laden Kokiri": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Laden Kokiri": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Laden Krabbelminen-Shop": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Laden Krabbelminen-Shop": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Laden Magie (Marktplatz)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Laden Magie (Marktplatz)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Laden Magie hinten": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Laden Magie hinten": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Laden Magie vorne": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Laden Magie vorne": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Laden Zoras Reich": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Laden Zoras Reich": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Maskenhändler": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Maskenhändler": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Schatzkisten-Poker": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Schatzkisten-Poker": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Scheune Lon Lon Farm": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Scheune Lon Lon Farm": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Schießbude (Kakariko)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Schießbude (Kakariko)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Schießbude (Marktplatz)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Schießbude (Marktplatz)": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Skulltula Haus": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Skulltula Haus": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Ställe Lon Lon Farm": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Ställe Lon Lon Farm": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Wächterhaus": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Wächterhaus": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Geistermarkt": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Geistermarkt": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Windmühle": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Windmühle": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Zelt der Zimmerleute": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Zelt der Zimmerleute": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Zitadelle der Zeit": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Zitadelle der Zeit": {
                clear: false,
                type: EntranceTypes.House,
                leadsTo: null,
                interior: null
            }
        }
    }
,

    // German grotto regions imported from checklist
    "Friedhof (Hymne der Sonne an Wand spielen)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Friedhof (Hymne der Sonne an Wand spielen)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Friedhof (Königsgrab)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Friedhof (Königsgrab)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Friedhof (Feenbrunnen; Truhe)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Friedhof (Feenbrunnen; Truhe)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Friedhof (Boris Grab)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Friedhof (Boris Grab)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Gebirgspfad (Hymne des Sturms bei Steinkreis vor Eingang zu Goronia)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Gebirgspfad (Hymne des Sturms bei Steinkreis vor Eingang zu Goronia)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Gebirgspfad (1x Kuh + 1x Bienenstock + 7x Rubin + 4x Herz)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Gebirgspfad (1x Kuh + 1x Bienenstock + 7x Rubin + 4x Herz)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Gerudo-Festung (Hymne des Sturms neben Holzkisten)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Gerudo-Festung (Hymne des Sturms neben Holzkisten)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Gerudotal (Hymne des Sturms neben Zelt)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Gerudotal (Hymne des Sturms neben Zelt)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Gerudotal (Handschuhe unter Fels in Schlucht)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Gerudotal (Handschuhe unter Fels in Schlucht)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Goronia (bei Lavasee)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Goronia (bei Lavasee)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Heilige Lichtung (Hymne des Sturms bei Eingang zu Waldtempel)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Heilige Lichtung (Hymne des Sturms bei Eingang zu Waldtempel)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Heilige Lichtung (Mitte)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Heilige Lichtung (Mitte)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Heilige Lichtung (bei Eingang zu Verlorenen Wäldern)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Heilige Lichtung (bei Eingang zu Verlorenen Wäldern)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Hylianische Steppe (Baum Nähe Kakariko)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Hylianische Steppe (Baum Nähe Kakariko)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Hylianische Steppe (Baum Nordwesten)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Hylianische Steppe (Baum Nordwesten)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Hylianische Steppe (Steinkreis Nähe Gerudotal)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Hylianische Steppe (Steinkreis Nähe Gerudotal)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Hylianische Steppe (bei Hyliasee)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Hylianische Steppe (bei Hyliasee)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Hylianische Steppe (Nähe Hyliasee)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Hylianische Steppe (Nähe Hyliasee)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Hylianische Steppe (Südosten)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Hylianische Steppe (Südosten)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Hylianische Steppe (Nordnordwesten)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Hylianische Steppe (Nordnordwesten)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Hylianische Steppe (bei Eingang zu Hyrule)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Hylianische Steppe (bei Eingang zu Hyrule)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Hylia-See (bei Grab)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Hylia-See (bei Grab)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Kakariko (bei Eingang)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Kakariko (bei Eingang)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Kakariko (bei Windmühle)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Kakariko (bei Windmühle)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Kokiri (Hymne des Sturms bei Eingang zu Verlorenen Wäldern)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Kokiri (Hymne des Sturms bei Eingang zu Verlorenen Wäldern)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Lon Lon-Farm (bei Rückseite von Pferdekoppel)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Lon Lon-Farm (bei Rückseite von Pferdekoppel)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Schloss Hyrule (Hymne des Sturms bei Baum von Schlossgraben)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Schloss Hyrule (Hymne des Sturms bei Baum von Schlossgraben)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Todeskrater (bei Eingang von Gebirgspfad)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Todeskrater (bei Eingang von Gebirgspfad)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Todeskrater (Hammer oder Handschuhe bei Eingang von Goronia)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Todeskrater (Hammer oder Handschuhe bei Eingang von Goronia)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Verlorene Wälder (bei Eingang zu Goronia)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Verlorene Wälder (bei Eingang zu Goronia)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Verlorene Wälder (bei Laubkerlen unter Erde; Masken)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Verlorene Wälder (bei Laubkerlen unter Erde; Masken)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Verlorene Wälder (bei Eingang zu Heiliger Lichtung)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Verlorene Wälder (bei Eingang zu Heiliger Lichtung)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Wüstenkoloss (Handschuhe unter Fels Nähe Plattform)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Wüstenkoloss (Handschuhe unter Fels Nähe Plattform)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Zora-Fluss (Hymne des Sturms bei Steinkreis bei Zugang zu Hylianischer Steppe)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Zora-Fluss (Hymne des Sturms bei Steinkreis bei Zugang zu Hylianischer Steppe)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Zora-Fluss (auf Plateau bei Steinkreis)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Zora-Fluss (auf Plateau bei Steinkreis)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Zora-Fluss (auf Plateau Nähe Skulltula; Truhe + 2x Bienenstock)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Zora-Fluss (auf Plateau Nähe Skulltula; Truhe + 2x Bienenstock)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    },
    "Zoras Reich (Hymne des Sturms auf Insel bei Eingang)": {
        colors: ["light", "dark"],
        isAccessible: false,
        isExpanded: true,
        entrances: {
            "Zoras Reich (Hymne des Sturms auf Insel bei Eingang)": {
                clear: false,
                type: EntranceTypes.Grotto,
                leadsTo: null,
                interior: null
            }
        }
    }

};
