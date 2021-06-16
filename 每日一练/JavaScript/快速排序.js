function quickSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const mid = arr[0]
    const [left, right] = [[], []]
    for (let i = 1,len = arr.length; i < len; i++) {
        if (arr[i] > mid) {
            left.push(arr[i])
        } else if (arr[i] <= mid) {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(mid, quickSort(right))
}

const arr = [3,3,4,2,7,8,9,23,65,89,64]

console.log(quickSort(arr));