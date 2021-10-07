const arr = [1, 2, 3, 2, 5, 6, 1, 1]

function sameSum(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    const len = arr.length
    let res = 0
    for (let i = 0; i < len; i++) {
        const leftSum = i === 0 ? arr[i] : arr.slice(0, i + 1).reduce((total, item) => total += item)
        for (let j = 0; j < len; j++) {
            const rightSum = arr.slice(j).reduce((total, item) => total += item)
            if (leftSum === rightSum) {
                res++
                console.log(i, j);
            }
        }
    }
    return res
}

console.log(sameSum(arr));