function flat(arr, depth = 1) {
    const res = []
    const queue = [].slice.call(arr, 0)
    let flag = false
    while (depth) {
        while (queue.length) {
            const item = queue.shift()
            if (Array.isArray(item)) {
                res.push(...item)
                flag = true
            } else {
                res.push(item)
            }
        }
        depth--
        if (!flag) {
            return res
        }
        if (depth) {
            queue.push(...res)
            res.length = 0
            flag = false
        }
    }
    return res
}

const arr = [1, [2], [3, [4]]];
console.log(flat(arr, Infinity))