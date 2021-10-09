/*
findInTree(list: TreeData[], id: number): TreeData
type TreeData = {
    id: number
    name: string
    children: TreeData[]
}
*/
//取出id对应的对象，也就是遍历，可以深度也可以广度
const list = [
    {
        id: 1, name: 'a', children: [
            { id: 2, name: 'a1', children: null },
            {
                id: 3, name: 'a2', children: [
                    { id: 4, name: 'a22', children: null }
                ]
            }
        ]
    },
    { id: 5, name: 'b', children: null }
]

function findInTree(tree, id) {
    let res = null
    for (let i = 0, len = tree.length; i < len; i++) {
        const { id: target, children } = tree[i]
        if (id === target) {
            res = tree[i]
            break
        }
        if (Array.isArray(children)) {
            res = findInTree(children, id)
        }
    }
    return res
}

function findInTree(tree, id) {
    const queue = [].concat(...tree)
    while (queue.length) {
        const { id: target, children } = item = queue.shift()
        if (target === id) {
            return item
        }
        Array.isArray(children) && queue.push(...children)
    }
    return null
}

console.log(findInTree(list, 4));