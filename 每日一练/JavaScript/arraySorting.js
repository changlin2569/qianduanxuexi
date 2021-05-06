function arraySorting(arr) {
    if (arr && Array.isArray(arr)) {
        let map = new Map();
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (map.has(arr[i])) {
                let total = map.get(arr[i]);
                map.set(arr[i], ++total);
                newArr.push({
                    data: arr[i],
                    sorce: total++
                })
            } else {
                map.set(arr[i], 1);
                newArr.push({
                    data: arr[i],
                    sorce: 1
                });
            }
        }
        let array = [];
        arr.forEach((item, index) => {
            if (map.get(item) === 1) {
                array.push(item);
            } else {
                if (typeof item === 'string') {
                    array.push(item + newArr[index].sorce);
                } else {
                    array.push(Number('' + item + newArr[index].sorce));
                }
            }
        })
        return array
    }
    return
}

console.log(arraySorting([1, '1', 21, 13, 21, '21', '1']));