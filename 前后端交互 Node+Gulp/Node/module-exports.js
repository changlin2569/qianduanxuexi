let a = name => `i am ${name}`;

let x = 9;
exports.fn = x;
// exports.fn = a;
//当module.exports 和 exports 指向不同的对象时，以前者为准

// module.exports.fn = a;
module.exports.fn = {
    name : 'jay'
}