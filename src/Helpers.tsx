//Helpers
export function replaceItemInArray<T>(arr: Array<T>, oldVal : T, newValue : T) {
    const modifed = arr.slice()
    modifed[arr.indexOf(oldVal)] = newValue
    return modifed
}

export function updateProp<X>(obj : X, prop_name : string, new_value : any) {
    return { ...obj, [prop_name]: new_value }
}

export function convertNumberValue(value : string){
    const as_number = Number(value)
    if(Number.isFinite(as_number) && !Number.isNaN(as_number)){
      return as_number
    }
    return value;
  }