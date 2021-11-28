function insertSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    for (let i = 1; i < arr.length; i++) {
        let [temp, j] = [arr[i], i - 1]
        for (; arr[j] > temp && j >= 0; j--) {
            arr[j + 1] = arr[j]
        }
        arr[j + 1] = temp
    }
    return arr
}


console.log(insertSort([3, 2, 1, 5, 6, 4]))