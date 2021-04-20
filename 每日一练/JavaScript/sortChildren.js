let prev = [];
function sortChildren(arr, id = null) {
    if (!arr || !arr.length) {
        return
    }
    for (let i = 0; i < arr.length; i++) {
        prev.push({
            id: arr[i].id,
            name: arr[i].name,
            parentId: id
        })
        if (Array.isArray(arr[i].children)) {
            sortChildren(arr[i].children, arr[i].id)
        }
    }
}

let arr = [
    {
        id: 1,
        name: 1,
        children: [
            {
                id: 2,
                name: 2,
                children: [
                    {
                        id: 3,
                        name: 3,
                    },
                    {
                        id: 4,
                        name: 4,
                        children: []
                    }
                ]
            }
        ]
    }
]

sortChildren(arr);
console.log(prev);