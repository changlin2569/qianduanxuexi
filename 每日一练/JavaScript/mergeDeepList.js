// Example 1
mergeDeepList([{ id: 1 }, { id: 3, pid: 1 }, { id: 4 }])
//=> [{id:1, children: [{id:3}]}, {id:4}]

// Example 2
mergeDeepList([{ id: 3, pid: 1 }, { id: 4, pid: 3 }, { id: 1 }])
//=>[{id:1, chidren: [{id:3, children: [{id:4}]}]}]

// 1. Node => {id, pid}  只关心id和pid即可， pid代表父节点id
// 2. 顺序不定， 但pid一定有对应的id节点存在
// 3. O(n) 时间复杂度解决

function mergeDeepList(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    const map = new Map()
    const res = []
    for (const node of arr) {
        const { id, pid } = node
        if (map.has(pid)) {
            const item = map.get(pid)
            item.children ??= []
            item.children.push(node)
        } else {
            res.push(node)
        }
        map.set(id, node)
    }
    map.clear()
    return res.reduceRight((prev, cur) => {
        const { id, pid } = cur
        if (map.has(pid)) {
            const item = map.get(pid)
            item.children ??= []
            item.children.push(item)
        } else {
            prev.push(cur)
        }
        map.set(id, cur)
        return prev
    }, [])
}