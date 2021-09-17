const tree = [
    {
        name: '小明',
        id: 1,
        pid: 0,
        children: [
            {
                name: '小花',
                id: 11,
                pid: 1,
                children: [
                    {
                        name: '小华',
                        id: 111,
                        pid: 11,
                    },
                    {
                        name: '小李',
                        id: 112,
                        pid: 11,
                    }
                ]
            },
            {
                name: '小红',
                id: 12,
                pid: 1,
            }
        ]
    },
    {
        name: '小王',
        id: 2,
        pid: 0,
        children: [
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
    }
]

function treeToArr_One(arr) {
    if (!Array.isArray(arr) || !arr.length) {
        return
    }
    const result = []
    for (let i = 0, len = arr.length; i < len; i++) {
        const { name, id, pid, children } = arr[i]
        if (Array.isArray(children)) {
            result.push(...treeToArr_One(children))
        }
        result.push({
            name,
            id,
            pid
        })
    }
    return result
}

console.log(treeToArr_One(tree));

// --------------------------------------

function treeToArr_Two(arr) {
    if (!Array.isArray(arr) || !arr.length) {
        return
    }
    const result = []
    for (let i = 0; i < arr.length; i++) {
        const { name, id, pid, children } = arr[i]
        result.push({
            name,
            id,
            pid
        })
        Array.isArray(children) && arr.push(...children)
    }
    return result
}

console.log(treeToArr_Two(tree));