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
    const targetK = arr.length - k
    const targetM = arr.length - m
    let res = 0
    while (true) {
        const count = partition(arr, 0, arr.length - 1)
        if (count === targetK) {
            let countK = 1
            let tempK = arr[count]
            let [leftK, rightK] = [count - 1, count + 1]
            while (arr[leftK] === tempK) {
                countK++
            }
            while (arr[rightK] === tempK) {
                countK++
            }
            res += tempK * countK
        } else if (count === targetM) {
            let countM = 1
            let tempM = arr[count]
            let [leftM, rightM] = [count - 1, count + 1]
            while (arr[leftM] === tempM) {
                countM++
            }
            while (arr[rightM] === tempM) {
                countM++
            }
            res += tempM * countM
        }
    }
}