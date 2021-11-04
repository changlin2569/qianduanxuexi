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
    if (!Array.isArray(tree)) {
        return
    }
    const res = []
    const _treePath = (tree, targetId) => {
        for (let { id, children } of tree) {
            if (targetId === id) {
                res.push(id)
                // console.log(res);
                return true
            }
            res.push(id)
            let flag = Array.isArray(children) && _treePath(children, targetId)
            if (flag) {
                return true
            }
            flag || res.pop()
        }
    }
    _treePath(tree, id)
    return res
}

function treePath(tree, id) {
    if (!Array.isArray(tree) || !tree.length || id === undefined) {
        return
    }
    const result = []
    const _treePath = (tree, id) => {
        if (!Array.isArray(tree)) {
            return
        }
        for (const { id: _id, children } of tree) {
            result.push(_id)
            const flag = Array.isArray(children) && _treePath(children, id)
            if (_id === id) {
                result.push(_id)
                return true
            }
            flag || result.pop()
        }
    }
    _treePath(tree, id)
    return result
}

console.log(treePath(tree, 111))