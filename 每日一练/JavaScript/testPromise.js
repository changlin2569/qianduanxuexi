const myPromise = require('./myPromise')

const p = new myPromise((resolve, reject) => {
    console.log(1);
    resolve(2);
})

p.then((data) => {
    console.log(data);
    return 3;
}).then((data) => {
    // 1111111111111
    console.log(data);
})

// p.then((data) => {
//     console.log(data);
//     console.log(3);
// })

// p.then((data) => {
//     console.log(data);
//     console.log(4);
// })

// p.then((data) => {
//     console.log(data);
//     console.log(5);
// })