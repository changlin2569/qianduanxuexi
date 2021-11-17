var generateMatrix = function (n) {
    const res = Array.from(Array(n), () => Array(n).fill(0))
    let [left, right] = [0, n - 1]
    let [top, bottom] = [0, n - 1]
    let count = 0
    while (left < right && top < bottom) {
        for (let i = left; i < right; i++) {
            res[top][i] = ++count
        }
        for (let i = top; i < bottom; i++) {
            res[i][right] = ++count
        }
        for (let i = right; i > left; i--) {
            res[bottom][i] = ++count
        }
        for (let i = bottom; i > top; i--) {
            res[i][left] = ++count
        }
        left++
        right--
        top++
        bottom--
    }
    if (left === right) {
        while (left <= right) {
            res[left++][top] = ++count
        }
    } else {
        while (top <= bottom) {
            res[left][bottom--] = ++count
        }
    }
    return res
}

generateMatrix(4)