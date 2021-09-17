const arr = [
    {
        name: '小明',
        id: 1,
        pid: 0,
    },
    {
        name: '小花',
        id: 11,
        pid: 1,
    },
    {
        name: '小华',
        id: 111,
        pid: 11,
    },
    {
        name: '小李',
        id: 112,
        pid: 11,
    },
    {
        name: '小红',
        id: 12,
        pid: 1,
    },
    {
        name: '小王',
        id: 2,
        pid: 0,
    },
    {
        name: '小林',
        id: 21,
        pid: 2,
    },
    {
        name: '小李',
        id: 22,
        pid: 2,
    }
]

function arrToTree_One(arr) {
    if (!Array.isArray(arr) || !arr.length) {
        return
    }
    const result = []
    const map = new Map()
    for (let i = 0, len = arr.length; i < len; i++) {
        const { id, pid } = arr[i]
        if (map.has(pid)) {
            map.get(pid).children = map.get(pid).children ?? []
            map.get(pid).children.push(arr[i])
        } else {
            result.push(arr[i])
        }
        map.set(id, arr[i])
    }
    return result
}

console.log(arrToTree_One(arr));

// -------------------------------------

// function arrToTree_Two(arr, pid) {
//     if (!Array.isArray(arr) || !arr.length) {
//         return
//     }
//     const result = []
//     for (let i = 0, len = arr.length; i < len; i++) {
//         const { id } = arr[i]
//         if ()
//     }
// }