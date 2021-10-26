// 全排列
function permute(arr) {
    if (arr.length === 1) {
        return [arr]
    }
    const len = arr.length
    const result = []
    const prev = {}
    const _permute = (res = []) => {
        if (res.length === len) {
            result.push([...res])
        }
        for (let item of arr) {
            if (prev[item]) {
                continue
            }
            res.push(item)
            prev[item] = true
            _permute(res)
            res.pop()
            prev[item] = false
        }
    }
    _permute()
    console.log(result);
    return result
}

permute([1, 2, 3])