/**
 * @Author: changlin
 * @Date: 2021-10-13 19:18:57
 * @name: 
 * @msg: 
 * @param {*} matrix
 * @return {*} 矩阵反转九十度
 */
var rotate = function (matrix) {
    const len = matrix.length
    const mid = len / 2
    for (let i = 0; i < len; i++) {
        let j = 0
        while (j < mid) {
            ;[matrix[i][j], matrix[i][len - j - 1]] = [matrix[i][len - j - 1], matrix[i][j]]
            j++
        }
    }
    // console.log(matrix);
    for (let i = 0; i < len - 1; i++) {
        let j = 0
        while (j < len - 1 - i) {
            ;[matrix[i][j], matrix[len - j - 1][len - i - 1]] = [matrix[len - j - 1][len - i - 1], matrix[i][j]]
            j++
        }
    }
    console.log(matrix);
    return matrix
};

// rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
rotate([[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]])

[[15, 13, 2, 5],
[14, 3, 4, 1],
[12, 6, 8, 9],
    [16, 7, 10, 11]]