let arr = [];

// 检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
console.log(arr instanceof Array);

function fakeInstanceof(left, right) {
    if (right.prototype === null || right.prototype === undefined) {
        return error('error')
    }
    let flag = false;
    while (left.__proto__ !== null) {
        if (left.__proto__ === right.prototype) {
                flag = true;
                break;
        }
        left = left.__proto__;
    }
    return flag;
}

console.log(fakeInstanceof(arr, Array));