function curry(fn) {
    // your code here
    // let [len, args] = [fn.length, []]
    let args = []
    let len = fn.length
    return function _curry(...params) {
        args = args.concat(...params)
        if (args.length >= len) {
            return fn.apply(null, args)
        } else {
            return _curry
        }
    }
}

const join = (a, b, c) => {
    return `${a}_${b}_${c}`
}

const curried = curry(join)(1, 2)

console.log(curried(3)); // '1_2_3'
console.log(curried(4));
// curriedJoin(1)(2, 3) // '1_2_3'

// curriedJoin(1, 2)(3) // '1_2_3'