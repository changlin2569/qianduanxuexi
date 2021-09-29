let arr = [
    {
        tag: ['A', 'B']
    },
    {
        tag: ['C', 'D']
    },
    {
        tag: ['E', 'F']
    }
]
/*
A,C,E
A,C,F
A,D,E
A,D,F
B,C,E
B,C,F
B,D,E
B,D,F
*/


function fullArrangement(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    const res = []
    const len = arr.length
    const _fullArrangement = (ans = [], deep = 0) => {
        const { tag } = arr[deep]
        for (let i = 0; i < tag.length; i++) {
            const newAns = ans.concat(tag[i])
            if (deep < len - 1) {
                _fullArrangement(newAns, deep + 1)
            } else {
                res.push(newAns)
            }
        }
    }
    _fullArrangement()
    return res
}

console.log(fullArrangement(arr));