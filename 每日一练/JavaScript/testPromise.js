const myPromise = require('./myPromise')

const p = new myPromise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        resolve(2);
    },1000)
})

p.then((data) => {
    console.log(data);
    console.log(3);
})

p.then((data) => {
    console.log(data);
    console.log(4);
})

p.then((data) => {
    console.log(data);
    console.log(5);
})