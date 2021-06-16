let prevArr = [];
function isHappyNum(num) {
    if (!num) {
        return false;
    }
    let numArr = num.toString().split('');
    let prev = 0;
    for (let i = 0; i < numArr.length; i++) {
        prev += Math.pow(Number(numArr[i]), 2);
    }
    if (prev === 1) {
        return true;
    } else if (prevArr.indexOf(prev) !== -1) {
        return false;
    }
    prevArr.push(prev);
    console.log(prevArr);
    return isHappyNum(prev);
}

// ----------------------------------------------------------------------------
var isHappy = function (n) {
    if (n === 1) {
        return true
    }
    const map = new Map()
    // map.set(n)
    let total = 0
    while (true) {
        n = '' + n
        for (let i = 0, len = n.length; i < len; i++) {
            total += n[i] ** 2
        }
        if (total === 1) {
            return true
        } else if (map.has(total)) {
            return false
        }
        map.set(total);
        [n, total] = [total, 0]
    }
};

console.log(isHappyNum(18));