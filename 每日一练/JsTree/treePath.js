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

function treePath(tree, id) {
    if (!Array.isArray(tree) || !tree.length || id === undefined) {
        return
    }
    const result = []
    const _treePath = (tree, id, path) => {
        if (!Array.isArray(tree)) {
            return
        }
        for (const { id: _id, children } of tree) {
            path.push(_id)
            const flag = Array.isArray(children) && _treePath(children, id, path)
            if (_id === id) {
                path.push(_id)
                return true
            }
            flag || path.pop()
        }
    }
    _treePath(tree, id, result)
    return result
}

console.log(treePath(tree, 112));