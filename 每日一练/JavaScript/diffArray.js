const arr1 = [
    { id: 1, value: 100 },
    { id: 2, value: 400 },
    { id: 3, value: 200 },
]
const arr2 = [
    { id: 1, value: 100 },
    { id: 2, value: 200 },
    { id: 3, value: 300 },
    { id: 4, value: 700 }
]

function diff(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return
    }
    // const res = []
    const map = new Map(arr1.map(({ id, value }) => [id, value]))
    const diff = arr2.reduce((prev, { id, value }) => {
        const val = map.get(id)
        if (val !== undefined) {
            if (val !== value) {
                prev.push({ id, val }, { id, value })
            }
        } else {
            prev.push({ id, value })
        }
        return prev
    }, [])
    console.log(diff);
    const map2 = new Map(arr2.map(({ id, value }) => [id, value]))
    return arr1.reduce((prev, { id, value }) => {
        const val = map2.get(id)
        if (val === undefined) {
            prev.push({ id, value })
        }
        return prev
    }, diff)
}

console.log(diff(arr1, arr2))