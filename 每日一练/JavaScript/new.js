function myNew (Fn, ...args) {
    if (typeof Fn !== 'function') {
        return
    }
    const obj = Object.create(Fn.prototype)
    const res = Fn.apply(obj, args)
    if ((typeof res === 'object' || typeof res === 'function') && res !== null) {
        return res
    } else {
        return obj
    }
}