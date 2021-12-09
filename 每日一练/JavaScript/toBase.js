function toBase(m, n) {
    if (n < 2 || n > 9) {
        return m
    }
    return m.toString(n)
}

toBase(100, 2) // 1100100

toBase(10, 3) // 101

// m是一个10进制的数
// n是一个2 - 9的整数