function typeOf(target) {
    // return Object.prototype.toString.call(target).match(/\s+(\w+)/)[1].toLowerCase()
    return Object.prototype.toString.call(target).split(' ')[1].toLowerCase().replace(']', '');
}

function deepCopy(target) {
    if (!target || typeof target !== 'object') {
        return
    }
    const res = Array.isArray(target) ? [] : {}
    const list = Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
    for (const key of list) {
        const type = typeOf(target[key])
        // if (type === 'object') {
        //     res[key] = deepCopy(target[key])
        // } else if (type === 'function') {
        //     res[key] = new Function(`return ${target[key].toString()}`)()
        // } else if (type === 'array') {
        //     res[key] = deepCopy(target[key])
        // } else {
        //     res[key] = target[key]
        // }
        switch (type) {
            case 'object':
            case 'array':
                res[key] = deepCopy(target[key])
                break
            case 'function':
                res[key] = new Function(`return ${target[key].toString()}`)()
                break
            default:
                res[key] = target[key]
        }
    }
    return res
}

function deepCopy(target) {
    if (!target || typeof target !== 'object') {
        return
    }
    const map = new Map()
    const _deepCopy = (target, map) => {
        if (map.has(target)) {
            return target
        }
        map.set(target)
        const keyList = Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
        const _res = Array.isArray(target) ? [] : {}
        keyList.forEach(key => {
            const type = typeOf(target[key])
            switch (type) {
                case 'object':
                case 'array':
                    _res[key] = _deepCopy(target[key], map)
                    break
                case 'function':
                    _res[key] = new Function(`return ${target[key].toString()}`)()
                    break
                default:
                    _res[key] = target[key]
                    break
            }
        })
        return _res
    }
    const res = _deepCopy(target, map)
    return res
}
let fn = Symbol('fn')
let obj = {
    a: 1,
    b: 2,
    c: function () {
        console.log(1);
    },
    [fn]: 'hello',
    d: fn,
    arr: [1, 2, 3],
    baz: null,
    foo: {
        a: 1,
    }
}
obj.foo.obj = obj
const res = deepCopy(obj)
console.log(res);
res.foo.a = 2;
console.log(obj);