function calc(n) {
    const res = []
    let i = 2
    let count = n
    while (i <= n) {
        while (!(count % i)) {
            res.push(i)
            count = count / i
        }
        i++
    }
    return res
}
console.log(calc(2))
// [2]
console.log(calc(8))
// [2, 2, 2]
console.log(calc(24))
// [2, 2, 2, 3]
console.log(calc(30))
// [2, 3, 5]