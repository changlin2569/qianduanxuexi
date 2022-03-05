
const obj = require('./2.js');
console.log(obj)
obj.setCount();

console.log('b', obj.count)

setTimeout(() => {
    console.log('b next', obj.count);
}, 2000);