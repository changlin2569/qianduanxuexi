function get(source, path, defaultValue = undefined) {
    if (!source || typeof source !== 'object') {
        return defaultValue
    }
    const pathArr = Array.isArray(path) ? path.join('.').split('.') : path.split('.')
    let res = source
    for (let key of pathArr) {
        let idx = key.indexOf('[')
        if (~idx) {
            console.log(key, idx);
            newKey = key.slice(0, idx)
            idx = key.slice(idx + 1, -1)
            res = res[newKey][idx]
        } else {
            res = res[key]
        }
        if (!res) {
            return defaultValue
        }
    }
    return res
}

const obj = {
    a: {
        b: {
            c: [1, 2, 3]
        }
    }
}

console.log(get(obj, 'a.b.c[0]'))