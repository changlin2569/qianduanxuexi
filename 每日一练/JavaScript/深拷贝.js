// 循环引用后栈溢出,没有考虑数组的情况
function deepClone(target) {
    // 属性是数组的情况
    if (Array.isArray(target)) {
        let res = [];
        for (let i of target) {
            res.push(i);
        }
        return res;
    } else if (typeof target === 'object' && target !== null) {
        let res = {};
        for (let key in target) {
            res[key] = deepClone(target[key]);
        }
        return res;
    } else {
        return target;
    }
}

let obj1 = {
    name : 'cl',
    age: 20,
    friends: {
        name: 'zr',
        age: 20,
    },
    arr: [1,2,3,4,5]
};
// obj1.obj = obj1
let obj2 = deepClone(obj1);

console.log(obj1);
console.log(obj2);
// obj2.arr = [];
// console.log(obj2);