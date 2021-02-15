//Helpers
export function replaceItemInArray(arr, oldVal, newValue) {
    const modifed = arr.slice()
    modifed[arr.indexOf(oldVal)] = newValue
    return modifed
}

export function updateProp(obj, prop_name, new_value) {
    return { ...obj, [prop_name]: new_value }
}