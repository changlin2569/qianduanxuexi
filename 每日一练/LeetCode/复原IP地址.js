function test(str) {
    if (str.length < 4 || str.length > 12) {
        return []
    }
    let res = []
    let length = str.length
    const _test = (path = [], start = 0) => {
        if (path.length === 4 && start === length) {
            res.push(path.join('.'))
            return
        }
        if (path.length === 4 && start < length) {
            return
        }
        for (let len = 1; len <= 3; len++) {
            if (start + len - 1 > length) {
                return
            }
            if (start > 1 && str[start] === '0') {
                return
            }
            const item = str.substring(start, start + len)
            if (len === 3 && item > 255) {
                return
            }
            path.push(item)
            _test(path, start + len)
            path.pop()
        }
    }
    _test()
    console.log(res);
    return res
}

test("25525511135")