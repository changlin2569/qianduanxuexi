function quickSort(arr, left = 0, right = arr.length - 1) {
    if (arr.length < 2) {
        return arr
    }
    if (left >= right) {
        return
    }
    // const [left, right] = [0, arr.length - 1]
    const pivot = partition(arr, left, right)
    quickSort(arr, left, pivot - 1)
    quickSort(arr, pivot + 1, right)
    console.log(arr);
    return arr
}

function partition(arr, left, right) {
    let temp = arr[left]
    let j = left
    for (let i = j + 1; i <= right; i++) {
        if (arr[i] < temp) {
            j++
                ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    ;[arr[left], arr[j]] = [arr[j], arr[left]]
    return j
}

// quickSort([5, 2, 7, 3, 9, 3, 11, 74, 22])

// ------------------------------------------------
// 插入排序

function test(arr) {
    if (arr.length < 2) {
        return arr
    }
    let len = arr.length
    for (let i = 1; i < len; i++) {
        let temp = arr[i]
        for (var j = i - 1; j >= 0 && arr[j] > temp; j--) {
            arr[j + 1] = arr[j]
        }
        arr[j + 1] = temp
    }
    console.log(arr)
    return arr
}

test([5, 2, 7, 3, 9, 3, 11, 74, 22])