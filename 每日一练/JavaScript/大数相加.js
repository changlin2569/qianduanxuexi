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
    if (item) {
        arr.unshift(item);
    }
    return arr.join('').replace(/0/, '');
}

function add(num1, num2) {
    num1 = ('' + num1).split('');
    num2 = ('' + num2).split('');
    const arr = [];
    let item1, item2, item = 0;
    while(num1.length || num2.length) {
        item1 = +num1.pop() || 0;
        item2 = +num2.pop() || 0;
        item = item1 + item2 + item;
        if (item >= 10) {
            arr.push(item % 10);
            item = 1;
        } else {
            arr.push(item);
            item = 0;
        }
    }
    if (item) {
        arr.push(item);
    }
    arr.reverse();
    return arr.join('')
}

console.log(addLargeNumber('1568415132154684984', '2012'));
console.log(add('1568415132154684984', '2012'))