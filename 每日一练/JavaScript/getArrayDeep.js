const arr = [1, 2, 3, [4, 5, [6, 7]]]

function getArrayDeep(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    let deep = 0
    let newArr = [].concat(arr)
    while (true) {
        let flag = newArr.some(item => Array.isArray(item))
        if (flag) {
            newArr = [].concat(...newArr)
            deep++
        } else {
            return deep
        }
    }
}

console.log(getArrayDeep([0, [2],
    [2, [3]]
]));
console.log(getArrayDeep([
    [
        [
            []
        ]
    ]
]));