//  螺旋打印矩阵


var spiralOrder = function (matrix) {
    const res = []
    let [top, bottom] = [0, matrix.length - 1]
    let [left, right] = [0, matrix[0].length - 1]
    while (left < right && top < bottom) {
        for (let i = left; i < right; i++) {
            console.log(res);
            res.push(matrix[top][i])
        }
        for (let i = top; i < bottom; i++) {
            res.push(matrix[i][right])
        }
        for (let i = right; i > left; i--) {
            res.push(matrix[bottom][i])
        }
        for (let i = bottom; i > top; i--) {
            res.push(matrix[i][left])
        }
        left++
        right--
        top++
        bottom--
    }
    if (top === bottom) {
        while (left <= right) {
            res.push(matrix[top][left++])
        }
    } else {
        console.log(bottom, top);
        console.log(right);
        while (bottom >= top) {
            res.push(matrix[bottom--][right])
        }
    }
    console.log(res)
    return res
};

spiralOrder([[1], [2]])