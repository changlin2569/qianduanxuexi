function isPalind(argue) {
    let count = argue.toString().split('').reverse().join('');
    console.log(count);
    return argue.toString() == count;
}

let x = 121;
console.log(isPalind(x));