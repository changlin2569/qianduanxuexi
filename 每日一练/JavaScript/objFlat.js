function objectFlat(obj = {}) {
    const res = {};
    function flat(target, name) {
        if (typeof target !== 'object') {
            res[name] = target;
        }
        for (const key in target) {
            if (target.hasOwnProperty(key)) {
                flat(target[key], `${name ? name + '.' : ''}${key}`)
            }
        }
    }
    flat(obj, '')
    return res
}


const source = {
    a: {
        b: {
            c: 1,
            d: 2
        },
        e: 3
    },
    f: {
        g: 2,
    },
    h: 4,
}
console.log(objectFlat(source));