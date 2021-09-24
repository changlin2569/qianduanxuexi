const arr = ['1a', '2b', '13c', '5a']

function test(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    const map = new Map()
    for (let i = 0, len = arr.length; i < len; i++) {
        const key = arr[i].slice(-1)
        if (map.has(key)) {
            const val = map.get(key)
            val.count++
            val.sum += +arr[i].slice(0, -1)
            continue
        }
        map.set(key, {
            count: 1,
            sum: +arr[i].slice(0, -1)
        })
    }
    const result = Array.from(map.values()).sort((x, y) => y.count - x.count)[0].sum
    return result
}

console.log(test(arr));

const obj = { bill: 500, sam: 480, roark: 501, tom: 999 };

function test(obj) {
    if (!obj || typeof obj !== 'object') {
        return
    }
    const arr = Object.entries(obj);
    let flag = true;
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j][1] < arr[j + 1][1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp
                flag = flag && false
            }
        }
        if (flag) {
            break
        }
    }
    const newArr = arr.map(item => item[0])
    return newArr
}

console.log(test(obj));