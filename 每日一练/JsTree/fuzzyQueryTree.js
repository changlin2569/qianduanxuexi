// 模糊数查询
const tree = [
    {
        name: '小明前端专家',
        id: 1,
        pid: 0,
        children: [
            {
                name: '小花前端程序媛',
                id: 11,
                pid: 1,
                children: [
                    {
                        name: '小华划水运动员',
                        id: 111,
                        pid: 11,
                    },
                    {
                        name: '小李摸鱼运动员',
                        id: 112,
                        pid: 11,
                    }
                ]
            },
            {
                name: '小红摸鱼程序员',
                id: 12,
                pid: 1,
            }
        ]
    },
    {
        name: '小王内卷王',
        id: 2,
        pid: 0,
        children: [
            {
                name: '小林摸鱼王',
                id: 21,
                pid: 2,
            },
            {
                name: '小李后端程序员',
                id: 22,
                pid: 2,
            }
        ]
    }
]

function fuzzyQueryTree(tree, params) {
    if (!Array.isArray(tree)) {
        return
    }
    const _fuzzyQueryTree = (tree, params) => {
        const result = []
        for (const item of tree) {
            let {
                children,
                name,
                id,
                pid
            } = item
            if (name.includes(params)) {
                children = Array.isArray(children) && _fuzzyQueryTree(children, params)
                children ? result.push({
                    id,
                    pid,
                    name,
                    children,
                }) : result.push({
                    id,
                    pid,
                    name,
                })
            } else {
                children = Array.isArray(children) && _fuzzyQueryTree(children, params)
                children.length && result.push({
                    id,
                    pid,
                    name,
                    children,
                })
            }

        }
        return result
    }
    return _fuzzyQueryTree(tree, params)
}

console.log(fuzzyQueryTree(tree, '程序'));
