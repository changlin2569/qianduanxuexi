function fn(tree, id) {
    let res

    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === id) {
            return tree[i]
        }
        if (Array.isArray(tree[i].children)) {
            res = fn(tree[i].children, id)
            if (res) {
                return res
            }
        }
    }
    return null
}


const tree = [
    {
        name: '小明',
        id: 1,
        pid: 0,
        show: true,
        children: [
            {
                name: '小花',
                id: 11,
                pid: 1,
                show: true,
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
                        show: true,
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
        show: true,
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

console.log(fn(tree, 2));