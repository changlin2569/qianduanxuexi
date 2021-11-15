// Example 1
// mergeDeepList([{ id: 1 }, { id: 3, pid: 1 }, { id: 4 }])
//=> [{id:1, children: [{id:3}]}, {id:4}]

function mergeDeepList(list) {
    if (!Array.isArray(list)) {
        return
    }
    list.sort(({ id: x }, { id: y }) => x - y)
    // console.log(list);
    const res = []
    const map = new Map()
    for (const item of list) {
        const { id, pid } = item
        if (map.has(pid)) {
            const children = map.get(pid).children
            map.get(pid).children = Array.isArray(children) ? [...children, item] : [item]
        } else {
            res.push(item)
        }
        map.set(id, item)
    }
    console.log(res);
    return res
}

// Example 2
mergeDeepList([{ id: 3, pid: 1 }, { id: 4, pid: 3 }, { id: 1 }])
//=>[{id:1, chidren: [{id:3, children: [{id:4}]}]}]

// 1. Node => {id, pid}  只关心id和pid即可， pid代表父节点id
// 2. 顺序不定， 但pid一定有对应的id节点存在
// 3. O(n) 时间复杂度解决