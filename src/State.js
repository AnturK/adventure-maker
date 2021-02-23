import { atom, selector, selectorFamily} from 'recoil'
import {replaceItemInArray} from './Helpers'

/// Eugh
export const global_ids = {};
export function unique_id(category) {
    category in global_ids ? global_ids[category] += 1 : global_ids[category] = 0
    return `${category} ${global_ids[category]}`
}

//Data classes
export class AdventureData {
    constructor() {
        this.name = "New adventure"
        this.starting_node = ""
        this.nodes = []
        this.triggers = []
        this.required_site_traits = []
        this.loot_types = []
        this.band_modifiers = {}
        this.starting_qualities = {}
    }
}

export class NodeData {
    constructor() {
        this.id = unique_id("Node")
        this.name = this.id
        this.description = "Node description goes here"
        this.choices = []
        this.image = "default"
        this.image_raw = undefined
        this.on_enter_effects = undefined
        this.on_exit_effects = undefined
    }
}

export class TriggerData{
    constructor(){
        this.id = unique_id("trigger")
        this.name = "Trigger"
        this.target_node = undefined
        this.on_trigger_effects = undefined
        this.requirements = undefined
    }
}

export class ChoiceData {
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
    constructor() {
        this.id = unique_id("effect")
        this.effect_type = "Add"
        this.quality = "Quality"
        this.value = 1
    }
}

export class ReqGroupData {
    constructor() {
        this.id = unique_id("req")
        this.group_type = "AND"
        this.requirements = []
    }
}

export class ReqData {
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

export const NodeSelector = selectorFamily({
    key: "single_node",
    get: (id) => ({ get }) => {
        const adventure = get(AdventureState);
        return adventure.nodes.find(x => x.id === id)
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

export const TriggerSelector = selectorFamily({
    key: "single_trigger",
    get: (id) => ({ get }) => {
        const adventure = get(AdventureState);
        return adventure.triggers.find(x => x.id === id)
    },
    set: (id) => ({ set, get }, newValue) => {
        const current = get(AdventureState)
        const modified = { ...current, triggers: replaceItemInArray(current.triggers, current.triggers.find(x => x.id === id), newValue) }
        set(AdventureState, modified)
    }
})
