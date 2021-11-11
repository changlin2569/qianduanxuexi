const map = new Map()
function isEqual(a, b) {
    // your code here
    if (typeof a !== 'object' || typeof b !== 'object') {
        return a === b
    }
    if (map.has(a)) {
        return true
    }
    const properties1 = Object.getOwnPropertyNames(a).concat(Object.getOwnPropertySymbols(a))
    const properties2 = Object.getOwnPropertyNames(b).concat(Object.getOwnPropertySymbols(b))
    if (properties1.length !== properties2.length) {
        return false
    }
    for (let key of properties1) {
        map.set(a)
        flag = isEqual(a[key], b[key])
        if (!flag) {
            return false
        }
    }
    return true
}