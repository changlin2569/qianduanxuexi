// 对参数的注解
// function add(a: number, b: number) {
//     return a + b;
// }

// 对函数返回值的注解
// function add(a: number, b: number) : number {
//     return a + b;
// }

// let total = add(1, 2);

// 函数参数是对象时的注解
function add({a, b} : {a: number, b: number}): number {
    return a + b;
}

let total = add({a: 1, b: 2});