const fs = require('fs');

const path = require('path');

console.log(__dirname);
console.log(path.join(__dirname, './demo.txt'));

fs.readFile(path.join(__dirname, './demo.txt'), 'utf8', (err, doc) => {
    console.log(err);
    console.log(doc);
})