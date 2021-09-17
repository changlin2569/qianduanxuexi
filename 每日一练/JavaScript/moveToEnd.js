const arr = [1, 2, 3, 4, 3, 3, 3, 5, 6, 7, 3]

function test(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    let count = 0;
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] !== 3) {
            arr[i - count] = arr[i];
        } else {
            count++
        }
    }
    let i = arr.length - count
    while (i < arr.length) {
        arr[i] = 3
        i++
    }
    return arr
}

console.log(test(arr));