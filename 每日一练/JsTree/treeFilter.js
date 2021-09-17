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

function treeFilter_One(arr) {
    if (!Array.isArray(arr) || !arr.length) {
        return
    }
    const result = []
    for (let i = 0, len = arr.length; i < len; i++) {
        let { name, id, pid, children, show } = arr[i]
        children = treeFilter_One(children)
        // show && result.push({
        //     name,
        //     id,
        //     pid,
        //     children,
        // })
        if (show) {
            children ? result.push({
                name,
                id,
                pid,
                show,
                children,
            }) : result.push({
                name,
                id,
                pid,
                show
            })
        }
    }
    return result
}

console.log(treeFilter_One(tree));