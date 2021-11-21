function quickSort(arr, lo = 0, hi = arr.length - 1) {
    if (lo >= hi) return
    const pivot = partition(arr, lo, hi)
    quickSort(arr, lo, pivot - 1)
    quickSort(arr, pivot + 1, hi)
}

function partition(arr, lo, hi) {
    const p = random(lo, hi + 1)
    const pivotNum = arr[p]

    // move pivot to the rightmost
    swap(arr, p, hi)

    let insertIndex = lo
    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivotNum) {
            swap(arr, insertIndex, i)
            insertIndex++
        }
    }

    // move pivot back to insertIndex
    swap(arr, insertIndex, hi)
    return insertIndex
}

function swap(arr, i, j) {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}

function random(lo, hi) {
    return Math.floor(Math.random() * (hi - lo)) + lo
}