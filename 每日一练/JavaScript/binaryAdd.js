function binaryAdd(num1, num2) {
    // TODO
    let res = ''
    let [i, j] = [num1.length - 1, num2.length - 1]
    let temp = 0
    while (i >= 0 || j >= 0) {
        let item1 = num1.charAt(i--) ?? 0
        let item2 = num2.charAt(j--) ?? 0
        let cur = +item1 + +item2 + temp
        if (cur > 1) {
            cur = 0
            temp = 1
        } else {
            temp = 0
        }
        res = cur + res
    }
    return temp === 1 ? temp + res : res
}
//Example
console.log(binaryAdd('1010', '111')); // '10001'