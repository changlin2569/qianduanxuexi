function test(arr) {
    if (!arr.length) {
        return
    }
    const res = [];
    const map = new Map()
    for (let i = 0,len = arr.length; i < len; i++) {
        map.set(arr[i].id, arr[i])
    }
    for (let key of map.keys()) {
        let cur = map.get(key)
        if (cur.parentId !== 0) {
            let parent = map.get(cur.parentId)
            if (!parent.children) {
                parent.children = []
            }
            parent.children.push(cur)
        } else {
            res.push(cur)
        }
    }
    return res
}

const arr = [
    { id: 1, name: 1, parentId: 0 },
    { id: 2, name: 2, parentId: 1 },
    { id: 3, name: 3, parentId: 2 },
    { id: 4, name: 4, parentId: 2 }
  ]

console.log(test(arr));