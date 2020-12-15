function reverse(x) {
    if (x >= 0) {
        x = x.toString().split('').reverse().join('');
        return x = x >= (2**31 - 1) ? 0 : x;
    } else {
        x = Math.abs(x);
        x = x.toString().split('').reverse().join('');
        return x =  x >= (2**31 - 1) ? 0 : -x;
    }

}
console.log(reverse(1534236469));;