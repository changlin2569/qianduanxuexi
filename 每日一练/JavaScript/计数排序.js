function countSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const maxVal = getMaxVal(arr)
    const countArr = new Array(maxVal)
    arr.forEach(item => {
        // countArr[item] ||= 0
        countArr[item] = countArr[item] || 0
        countArr[item]++
    })
    let countIdx = 0
    countArr.forEach((item, index) => {
        while (item) {
            arr[countIdx++] = index
            item--
        }
    })
    console.log(arr)
    return arr
}

function getMaxVal(arr) {
    let res = arr[0]
    for (let i = 1, len = arr.length; i < len; i++) {
        res = arr[i] > res ? arr[i] : res
    }
    return res
}

const arr = [5, 4, 3, 2, 1, 1, 1, 0]

countSort(arr)