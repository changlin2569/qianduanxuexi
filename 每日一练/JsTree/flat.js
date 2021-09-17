const arr = [1, [2, [3, 4]], 5, [6]];

function flat_One(arr, deep = 1) {
    if (!Array.isArray(arr) || !arr.length) {
        return
    }
    const result = []
    for (let i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i]) && deep > 0) {
            result.push(...flat_One(arr[i], deep - 1))
        } else {
            result.push(arr[i])
        }
    }
    return result
}

console.log(flat_One(arr));

// ---------------------------------------------------------

function flat_Two(arr, deep = 1) {
    if (!Array.isArray(arr) || !arr.length) {
        return
    }
    return arr.reduce((prev, item) => {
        if (Array.isArray(item) && deep > 0) {
            prev.push(...flat_Two(item, deep - 1));
        } else {
            prev.push(item)
        }
        return prev;
    }, [])
}

console.log(flat_Two(arr));

// ----------------------------------------------------------

function flat_Three(arr, deep = 1) {
    if (!Array.isArray(arr) || !arr.length) {
        return
    }
    const queue = arr.slice(0)
    const result = []
    while (deep) {
        while (queue.length) {
            const item = queue.shift()
            Array.isArray(item) ? result.push(...item) : result.push(item)
        }
        deep -= 1
        if (deep) {
            queue.push(...result)
            result.length = 0
        }
    }
    return result
}

console.log(flat_Three(arr, 2));