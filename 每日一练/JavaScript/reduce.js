const arr = [1, 2, , 3, 4, 5]
const cb = (prev, item, index) => {
    // console.log(prev);
    return prev + item + index
}
// const res1 = arr.reduce(cb, 0)
// console.log(res1);

Array.prototype.fakeReduce = function (cb, initial) {
    if (!cb || typeof cb !== 'function') {
        return
    }
    let result
    const arr = this
    if (initial != undefined) {
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i] == undefined) {
                continue
            }
            result = result ? cb(result, arr[i], i) : cb(initial, arr[i], i)
        }
    } else {
        for (let i = 1, len = arr.length; i < len; i++) {
            if (arr[i] == undefined) {
                continue
            }
            result = result ? cb(result, arr[i], i) : cb(arr[0], arr[i], i)
        }
    }
    return result
}
const res2 = arr.fakeReduce(cb, 0)
console.log(res2);