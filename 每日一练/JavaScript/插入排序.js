function insert(arr) {
    let temp;
    for (let i = 1; i < arr.length; i++) {
        temp = arr[i];
        for (let j = i - 1;j >= 1;j--) {
            if (arr[j] < arr[i]) {
                [arr[j + 1],arr[i]] = [arr[i],arr[j + 1]];
            }
        }
    }
    console.log(arr);
    return arr;
}

let arr = [9,8,7,6,5,4,3,2,1];
console.log(insert(arr));