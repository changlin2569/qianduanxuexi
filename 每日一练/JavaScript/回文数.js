function isPalind(argue) {
    let count = argue.toString().split('').reverse().join('');
    return argue.toString() == count;
}

let x = 121;
console.log(isPalind(x));;