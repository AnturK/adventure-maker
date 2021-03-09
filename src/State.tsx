import { atom, selector, selectorFamily, SerializableParam} from 'recoil'
import {replaceItemInArray} from './Helpers'

/// Eugh
export const global_ids : Record<string,number> = {};
export function unique_id(category : string) {
    category in global_ids ? global_ids[category] += 1 : global_ids[category] = 0
    return `${category} ${global_ids[category]}`
}

//Data classes
export class AdventureData {
    name : string;
    starting_node : string;
    nodes : Array<NodeData>;
    triggers : Array<TriggerData>;
    required_site_traits : Array<string>;
    loot_types : Array<string>;
    band_modifiers : Record<string,number>;
    starting_qualities : Record<string,number|string>;
    deep_scan_description : string;
    author : string;

    constructor() {
        this.name = "New adventure"
        this.starting_node = ""
        this.nodes = []
        this.triggers = []
        this.required_site_traits = []
        this.loot_types = []
        this.band_modifiers = {}
        this.starting_qualities = {}
        this.deep_scan_description  = ""
        this.author = "Anonymous"
    }
}

export class NodeData {
    id : string;
    name : string;
    description : string;
    choices : Array<ChoiceData>;
    image : string;
    raw_image : string | undefined;
    on_enter_effects : Array<EffectData> | undefined;
    on_exit_effects : Array<EffectData> | undefined;

    constructor() {
        this.id = unique_id("Node")
        this.name = this.id
        this.description = "Node description goes here"
        this.choices = []
        this.image = "default"
        this.raw_image = undefined
        this.on_enter_effects = undefined
        this.on_exit_effects = undefined
    }
}

export class TriggerData{
    id : string;
    name : string;
    target_node : string | undefined;
    on_trigger_effects : Array<EffectData> | undefined;
    requirements : Array<ReqData | ReqGroupData> | undefined;
    constructor(){
        this.id = unique_id("trigger")
        this.name = "Trigger"
        this.target_node = undefined
        this.on_trigger_effects = undefined
        this.requirements = undefined
    }
}

export class ChoiceData {
    id : string;
    key : string;
    name : string;
    exit_node : string;
    on_selection_effects : Array<EffectData> | undefined;
    requirements : Array<ReqData | ReqGroupData> | undefined;
    delay : number;
    delay_message : string | undefined;

    constructor() {
        this.id = unique_id("choice")
        this.key = this.id
        this.name = "New Choice"
        this.exit_node = "FAIL"
        this.on_selection_effects = undefined
        this.requirements = undefined
        this.delay = 0
        this.delay_message = undefined
    }
}

export class EffectData {
    id : string;
    effect_type : string;
    quality : string;
    value : string | number;
    constructor() {
        this.id = unique_id("effect")
        this.effect_type = "Add"
        this.quality = "Quality"
        this.value = 1
    }
}

export class ReqGroupData {
    id : string;
    group_type : string;
    requirements : Array<ReqData | ReqGroupData>;
    constructor() {
        this.id = unique_id("req")
        this.group_type = "AND"
        this.requirements = []
    }
}

export class ReqData {
    id : string;
    quality : string;
    operator : string;
    value : string | number;
    constructor() {
        this.id = unique_id("req")
        this.quality = "Quality"
        this.operator = "=="
        this.value = 1
    }
}

export const AdventureState = atom({
    key: "adventure",
    default: new AdventureData(),
})

export const NodesSelector = selector({
    key: "nodes",
    get: ({ get }) => {
        const adventure = get(AdventureState)
        return adventure.nodes
    }
})

export const NodeSelector = selectorFamily<NodeData,SerializableParam>({
    key: "single_node",
    get: (id) => ({ get }) => {
        const adventure = get(AdventureState);
        return adventure.nodes.find(x => x.id === id);
    },
    set: (id) => ({ set, get }, newValue) => {
        const current = get(AdventureState)
        const modified = { ...current, nodes: replaceItemInArray(current.nodes, current.nodes.find(x => x.id === id), newValue) }
        set(AdventureState, modified)
    }
})

export const TriggersSelector = selector({
    key: "triggers",
    get: ({ get }) => {
        const adventure = get(AdventureState)
        return adventure.triggers
    }
})

export const TriggerSelector = selectorFamily<TriggerData,SerializableParam>({
    key: "single_trigger",
    get: (id) => ({ get }) => {
        const adventure = get(AdventureState);
        return adventure.triggers.find(x => x.id === id);
    },
    set: (id) => ({ set, get }, newValue) => {
        const current = get(AdventureState)
        const modified = { ...current, triggers: replaceItemInArray(current.triggers, current.triggers.find(x => x.id === id), newValue) }
        set(AdventureState, modified)
    }
})
