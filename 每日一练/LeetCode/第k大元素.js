function findKthLargest(arr, k) {
    let len = arr.length
    let left = 0
    let right = len - 1
    // 6个元素，第 2大的就是下标为 4
    let target = len - k

    while (true) {
        const res = partition(arr, left, right)

        if (res === target) {
            return arr[res]
        } else if (res < target) {
            left = res + 1
        } else {
            right = res - 1
        }
    }
}

function partition(arr, left, right) {
    let temp = arr[left]
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

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));

// ------------------------------------------------------

// 解法2： 随机化基准值，如果不娶随机值，对于排序好的数组，时间复杂度会退化

function findKthLargest(arr, k) {
    let len = arr.length
    let left = 0
    let right = len - 1
    // 6个元素，第 2大的就是下标为 4
    let target = len - k

    while (true) {
        const res = partition(arr, left, right)

        if (res === target) {
            return arr[res]
        } else if (res < target) {
            left = res + 1
        } else {
            right = res - 1
        }
    }
}

function partition(arr, left, right) {
    const Idx = randomIdx(left, right)
        ;[arr[left], arr[Idx]] = [arr[Idx], arr[left]]

    let temp = arr[left]
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

function randomIdx(left, right) {
    return Math.floor(Math.random() * (right - left)) + left
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));