function myObjectIs(a, b) {
    if (a === 0) {
        return Infinity / 0 === Infinity / b
    } else if (a !== a) {
        return b !== b
    }
    return a === b
}

console.log(myObjectIs(NaN, NaN))

console.log(myObjectIs(0, -0))