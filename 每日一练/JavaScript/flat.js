let arr = [1,2,3,[4,5,6,[7,8,9]]]
// console.log(arr.flat(Infinity));

function flat1(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    let newArr = arr.reduce((prev, item) => {
        if (!Array.isArray(item)) {
            return [...prev, item]
        }
        return [...prev,...flat(item)]
    }, [])
    return newArr
}

function flat2(arr, deep = 1) {
    if (deep > 0) {
        let newArr = arr.reduce((prev, item) => {
            if (!Array.isArray(item)) {
                return [...prev, item]
            }
            return [...prev, ...flat2(item, deep - 1)];
        }, [])
        return newArr;
    }
    return arr;
}

function flat3(arr, deep = 1) {
    let result = [];
    let stack = arr.slice();
    while(stack.length > 0) {
        let item = stack.pop();
        if (Array.isArray(item) && deep > 0) {
            stack.push(...item);
            deep--;
            continue;
        }
        result.unshift(item);
    }
    return result;
}

Array.prototype.fakeFlat = function (depth = 1) {
    return this.reduce((prev, cur) => {
        if (Array.isArray(cur) && depth > 0) {
            prev.push(...cur.fakeFlat(depth - 1));
        } else {
            prev.push(cur);
        }
        return prev;
    }, [])
}

console.log(flat3(arr, Infinity));