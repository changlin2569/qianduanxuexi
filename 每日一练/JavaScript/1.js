const arr = [1, 2, 4, 4, 4, 5, 5, 6]

function test(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    const res = []
    for (let i = 0, l = arr.length; i < l; i++) {
        const item = arr[i]
        if (res.includes(item)) {
            continue
        }
        i !== arr.lastIndexOf(item) && res.push(item)
    }
    console.log(res);
    return res
}

test(arr)