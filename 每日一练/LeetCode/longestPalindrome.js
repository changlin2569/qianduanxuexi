var longestPalindrome = function (s) {
    const len = s.length
    if (len < 2) {
        return s
    }
    const dp = Array.from(Array(len), () => Array(len))
    for (let i = 0; i < len; i++) {
        dp[i][i] = true
    }
    let [begin, maxLen] = [0, 1]
    for (let l = 2; l <= len; l++) {
        for (let i = 0; i < len; i++) {
            const j = l + i - 1
            if (j >= len) {
                break
            }

            if (s.charAt(i) !== s.charAt(j)) {
                dp[i][j] = false
            } else if (j - i < 3) {
                dp[i][j] = true
            } else {
                dp[i][j] = dp[i + 1][j - 1]
            }

            if (dp[i][j] && j - i + 1 > maxLen) {
                maxLen = j - i + 1
                begin = i
            }
        }
    }
    console.log(s.slice(begin, begin + maxLen));
    return s.slice(begin, begin + maxLen)
};

longestPalindrome("cbbd")