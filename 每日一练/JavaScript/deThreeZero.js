const data = [1, 2, 3, 0, 0, 0, 5, 2, 0, 1, 0, 0, 2];
//去除三个及以上相邻的0
//返回结果：[1,2,3,5,2,0,1,0,0,2]

function deThreeZero(arr) {
    if (!Array.isArray(arr) || !arr.length) {
        return
    }
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === 0) {
            let j = i
            while (!arr[j]) {
                j++
            }
            if (j - i >= 3) {
                arr.splice(i, 3)
            }
        }
    }
    return arr
}

function test(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
            let j = i + 1
            let count = 1
            while (arr[j++] === 0) {
                count++
            }
            count >= 3 && arr.splice(i, count)
        }
    }
    console.log(arr)
    return arr
}

console.log(deThreeZero(data));