function flat(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    let newArr = arr.reduce((prev, item) => {
        if (!Array.isArray(item)) {
            return [...prev, item]
        }
        return [...prev,...flat(item)]
    }, [])
    return newArr
}


console.log(flat([1,2,3,[4,5,6,[7,8,9]]]));