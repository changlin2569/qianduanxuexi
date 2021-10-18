function bucketSort(arr, bucketSize = 5) {
    if (arr.length < 2) {
        return arr
    }
    const [maxVal, minVal] = getExtremum(arr)
    const bucketNum = Math.floor((maxVal - minVal) / bucketSize) + 1
    const bucket = Array.from(Array(bucketNum), () => [])
}

function getExtremum(arr) {
    let maxVal = minVal = arr[0]
    for (let i = 1, len = arr.length; i < len; i++) {
        maxVal = Math.max(maxVal, arr[i])
        minVal = Math.min(minVal, arr[i])
    }
    return [maxVal, minVal]
}

const arr = [6, 3, 8, 4, 0, 1, 2, 7, 12, 16]