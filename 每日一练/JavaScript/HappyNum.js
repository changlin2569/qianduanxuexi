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
console.log(isHappyNum(18));