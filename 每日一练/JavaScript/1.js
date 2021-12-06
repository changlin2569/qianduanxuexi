/**
* 找出数组中第k大和第m大的数字相加之和
* 说明：实现一个方法，找出数组中第k大的和第m大的数字相加之和
* 示例：
*   let arr = [1,2,4,4,3,5], k = 2, m = 4
*   findTopSum(arr, k, m); // 第2大的数是4，出现2次，第4大的是2，出现1次，所以结果为10
*/

function findTopSum(arr, k, m) {
    if (!Array.isArray(arr)) {
        return
    }
    const newArr = [...new Set(arr)].sort((x, y) => x - y)
        ;[k, m] = [newArr.length - k, newArr.length - m]
    return arr
        .filter(item => item === newArr[k] || item === newArr[m])
        .reduce((prev, item) => prev += item)
}

console.log(findTopSum([1, 2, 4, 4, 3, 5], 2, 4))