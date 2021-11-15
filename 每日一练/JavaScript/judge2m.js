function test(num) {
    if (num <= 1) {
        return false
    }
    while (num !== 1) {
        num = num / 2
        let [, right] = `${num}`.split('.')
        if (right) {
            return false
        }
    }
    return true
}

console.log(test(0));
console.log(test(1));
console.log(test(8));
console.log(test(12));