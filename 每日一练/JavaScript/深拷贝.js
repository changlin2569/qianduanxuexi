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

function deepClone(target) {
    if (typeof target === 'object' && target !== null) {
        let res = Array.isArray(target) ? [] : {};
        for (let key in target) {
            res[key] = deepClone(target[key]);
        }
        return res;
    }
    return target;
}

function deepClone(target) {
    let map = new Map();
    let result = clone(target, map);
    return result;
    function clone(target, map) {
        if (typeof target === 'object' && target !== null) {
            let res = Array.isArray(target) ? [] : {};
            if (map.has(target)) {
                return target;
            }
            // 考虑循环引用的情况
            map.set(target);
            for (let key in target) {
                res[key] = clone(target[key], map);
            }
            return res;
        }
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

obj2.arr = [];
console.log(obj1);
console.log(obj2);
// console.log(obj2.obj);