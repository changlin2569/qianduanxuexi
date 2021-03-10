let arr = [];

// ES6方法
console.log(Array.isArray(arr));

// 检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
console.log(arr instanceof Array);

console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.constructor === Array);

console.log(Object.prototype.toString.call(arr) === '[object Array]');

// 检测arr的原型链上是否出现Array.prototype
console.log(Array.prototype.isPrototypeOf(arr));