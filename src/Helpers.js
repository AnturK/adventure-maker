//Helpers
export function replaceItemInArray(arr, oldVal, newValue) {
    const modifed = arr.slice()
    modifed[arr.indexOf(oldVal)] = newValue
    return modifed
}

export function updateProp(obj, prop_name, new_value) {
    return { ...obj, [prop_name]: new_value }
}

export function convertNumberValue(value){
    const as_number = Number(value)
    if(Number.isFinite(as_number) && !Number.isNaN(as_number)){
      return as_number
    }
    return value;
  }