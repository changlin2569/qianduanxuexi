function compose(...args) {
    if (!args.length) {
        return
    }
    return function (...params) {
        let res;
        args.forEach(item => {
            res ? (res = item(res)) : (res = item(...params))
        })
        return res
    }
}

function fn1(x) {
    return x + 1;
}

function fn2(x) {
    return x + 2;
}

function fn3(x) {
    return x + 3;
}

function fn4(x) {
    return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11