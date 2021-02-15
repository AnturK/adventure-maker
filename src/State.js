import { atom, selector, selectorFamily} from 'recoil'
import {replaceItemInArray} from './Helpers'

/// Eugh
export const global_ids = {};
export function unique_id(category) {
    category in global_ids ? global_ids[category] += 1 : global_ids[category] = 0
    return global_ids[category]
}

//Data classes
export class AdventureData {
    constructor() {
        this.name = "New adventure"
        this.starting_node = null
        this.nodes = []
        this.required_traits = []
        this.loot_types = []
        this.scanner_band_modifiers = []
    }
}

export class NodeData {
    constructor() {
        this.id = unique_id("node")
        this.name = "Node " + this.id
        this.description = "Node description goes here"
        this.choices = []
        this.image = "default"
        this.image_raw = undefined
        this.on_enter_effects = undefined
        this.on_exit_effects = undefined
    }
}

export class ChoiceData {
    constructor() {
        this.id = unique_id("choice")
        this.name = "New Choice"
        this.exit_node = "FAIL"
        this.on_selection_effects = undefined
        this.requirements = undefined
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
