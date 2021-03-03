console.log(1568415132154684984 + 2012);

function addLargeNumber(num1, num2) {
    num1 = ('0' + num1).split('');
    num2 = ('0' + num2).split('');
    let item = 0;
    let arr = [];
    let index = num1.length - num2.length
    if (index > 0) {
        for (let i = 0; i < index; i++) {
            num2.unshift('0');
        }
    } else {
        for (let i = 0; i < index; i++) {
            num1.unshift('0');
        }
    }
    for (let i = num1.length - 1; i >= 0; i--) {
        item = parseInt(num1[i]) + parseInt(num2[i]) + item;
        arr[i] = item >= 10 ? item % 10 : item;
        item = item >= 10 ? 1 : 0;
    }
    return arr.join('').replace(/0/, '');
}

console.log(addLargeNumber('1568415132154684984', '2012'));