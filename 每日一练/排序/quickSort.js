function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left > right) {
        return
    }
    const Idx = partition(arr, left, right)
    quickSort(arr, left, Idx - 1)
    quickSort(arr, Idx + 1, right)
    return arr
}

function partition(arr, left, right) {
    const temp = arr[left]
    let j = left
    for (let i = left + 1; i <= right; i++) {
        if (arr[i] < temp) {
            j++
                ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    ;[arr[left], arr[j]] = [arr[j], arr[left]]
    return j
}


console.log(quickSort([3, 2, 1, 5, 6, 4]))