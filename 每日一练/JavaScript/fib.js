function fib(n) {
    // your code here
    if (n < 2) {
        return n
    }
    return fib(n - 1) + fib(n - 2)
}

console.log(fib(5))

const fib1 = (n, m = { 0: 0, 1: 1 }) => m[n] ??= fib(n - 1, m) + fib(n - 2, m)

const fib2 = (n, m = [0, 1]) => m[n] ??= fib(n - 1, m) + fib(n - 2, m)

console.log(fib2(5))

function fib3(n, prev1 = 0, prev2 = 1) {
    if (n === 0) {
        return 0
    }
    if (n === 1) {
        if (prev2 === 1) {
            return 1
        }
        return prev2
    }
    return fib3(n - 1, prev2, prev2 + prev1)
}

console.log(fib3(3));