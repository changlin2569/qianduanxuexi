function getArrayDeep(arr) {
    if (!arr.length) {
        return 0
    }
    let queue = [].concat(arr)
    let deep = 0
    while (true) {
        let flag = queue.some(item => Array.isArray(item))
        if (flag) {
            deep++
            queue = [].concat(...queue)
        } else {
            return deep
        }
    }
}

function getArrayDeep(arr, deep = 0) {
    // 保存每一层的深度快照，不然会随着迭代的次数导致 deep不准确
    let res = deep

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            deep = Math.max(deep, getArrayDeep(arr[i], res + 1))
        }
    }

    return deep
}

function getArrayDeep(arr) {
    // 深度值设置为 -1 的原因是因为 条件判断为当前值是否为数组
    let deep = -1

    if (!Array.isArray(arr)) {
        return deep
    }

    for (let i = 0; i < arr.length; i++) {
        deep = Math.max(deep, getArrayDeep(arr[i]))
    }

    return deep + 1
}

let len1 = getArrayDeep([1, 2, [3, [1, [0]]]]); // 返回 3
let len2 = getArrayDeep([]); // 返回 0
let len3 = getArrayDeep([[[[]]]]); // 返回 3
let len4 = getArrayDeep([[0], [2], [2, [3]]]); // 返回 2

console.log(len1, len2, len3, len4);