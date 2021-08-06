function isWanShu() {
    const res = [];
    const cur = [];
    for (let i = 0; i < 1000; i++) {
        cur.length = 0
        for (let j = 1; j < i; j++) {
            if (i % j === 0) {
                cur.push(j)
            }
        }
        cur.length > 1 && cur.reduce((prev, item) => prev += item) === i && res.push(i)
    }
    return res
}
console.log(isWanShu());