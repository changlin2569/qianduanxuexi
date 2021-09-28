/*
金额格式化
1000000 => 1,000,000
10.24 => 10.24
*/

function formatMoney(money) {
    if (!money) {
        return
    }
    const [left, right] = String(money).split('.')
    let res = ''
    for (let i = left.length - 1, j = 0; i >= 0; i--, j++) {
        if (j % 3 === 0 && j !== 0) {
            res = ',' + res
        }
        res = left[i] + res
    }
    res = right ? res + '.' + right : res
    return res
}

formatMoney('14.0')