function mergeSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const mid = Math.floor(arr.length / 2)
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid))
    arr = merge(left, right)
    return arr
}

function merge(left, right) {
    let [i, j] = [0, 0]
    const res = []
    while (i < left.length && j < right.length) {
        res.push(left[i] > right[j] ? right[j++] : left[i++])
    }
    return res.concat(i === left.length ? right.slice(j) : left.slice(i))
}

console.log(mergeSort([3, 2, 1, 5, 6, 4]))