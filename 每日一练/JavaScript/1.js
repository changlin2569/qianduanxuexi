
const arr = [
    { id: 1, name: "i1" },
    { id: 2, name: "i2", parentId: 1 },
    { id: 4, name: "i4", parentId: 3 },
    { id: 3, name: "i3", parentId: 2 }
]

const obj = {
    id: 1,
    name: "i1",
    children: [
        {
            id: 2,
            name: "i2",
            parentId: 1,
            children: [
                {
                    id: 3,
                    name: "i3",
                    parentId: 2,
                    children: [
                        {
                            id: 4,
                            name: "i4",
                            parentId: 3
                        }
                    ]
                }
            ]
        }
    ]
}
