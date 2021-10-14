/*
 * @Author: changlin
 * @Date: 2021-10-14 17:26:02
 * @LastEditTime: 2021-10-14 17:33:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\每日一练\LeetCode\1.js
 */
var findLength = function (nums1, nums2) {
    const [lenA, lenB] = [nums1.length, nums2.length]
    const dp = Array.from(Array(lenA + 1), () => Array(lenB + 1).fill(0))
    let res = 0
    // console.log(dp)
    for (let i = 1; i <= lenA; i++) {
        for (let j = 1; j <= lenB; j++) {
            // dp[i][j] = nums1[i - 1] === nums2[j - 1] && ++dp[i - 1][j - 1]
            if (nums1[i - 1] === nums2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            }
            res = Math.max(dp[i][j], res)
        }
    }
    // console.log(dp);
    return res
};

findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7])