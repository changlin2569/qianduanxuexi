/**
* 找出数组中第k大和第m大的数字相加之和
* 说明：实现一个方法，找出数组中第k大的和第m大的数字相加之和
* 示例：
*   let arr = [1,2,4,4,3,5], k = 2, m = 4
*   findTopSum(arr, k, m); // 第2大的数是4，出现2次，第4大的是2，出现1次，所以结果为10
*/

var findAnagrams = function (s, p) {
    s = s.split('')
    p = p.split('').sort()
    const res = []
    const len = p.length
    for (let i = 0; i <= s.length - len; i++) {
        const item = s.slice(i, len + i).sort()
        console.log(s.slice(i, len + i));
        if (item.join('') == p.join('')) {
            res.push(i)
        }
    }
    console.log(res);
    return res
}

findAnagrams("abab", "ab")