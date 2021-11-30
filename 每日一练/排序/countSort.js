function countSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const maxVal = Math.max(...arr)
    const newArr = new Array(maxVal + 1).fill(0)
    arr.forEach(val => newArr[val]++)
    let countIdx = 0
    newArr.forEach((val, index) => {
        while (val) {
            arr[countIdx++] = index
            val--
        }
    })
    return arr
}

//  O(n + k)
console.log(countSort([3, 2, 1, 5, 6, 4]))