function bucketSort(arr, bucketSize = 5) {
    if (arr.length < 2) {
        return arr
    }
    const [maxVal, minVal] = getExtremum(arr)
    const bucketNum = Math.floor((maxVal - minVal) / bucketSize) + 1
    const bucket = Array.from(Array(bucketNum), () => [])
    for (let i = 0, len = arr.length; i < len; i++) {
        const index = Math.floor((arr[i] - minVal) / bucketSize)
        bucket[index].push(arr[i])
    }
    bucket.forEach(item => item.sort((x, y) => x - y))
    return bucket.flat()
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

bucketSort(arr)