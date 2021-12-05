// 求两个升序数组的交集
function intersection(arr1, arr2) {
    if (!arr1.length || !arr2.length) {
        return []
    }
    const res = []
    let [i, j] = [0, 0]
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] === arr2[j]) {
            res.push(arr1[i])
            i++
            j++
        } else if (arr1[i] < arr2[j]) {
            i++
        } else {
            j++
        }
    }
    return res
}

console.log(intersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7, 8, 9]))