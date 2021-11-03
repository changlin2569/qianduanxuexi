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


const arr = [1, 2, 3, 4, 5, 3, 7, 8, 9, 4, 4]

function test(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    const len = arr.length
    for (let i = j = 0; i < len; i++) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
        if (arr[j] !== 3) {
            j++
        }
    }
    console.log(arr)
    return arr
}

test(arr)