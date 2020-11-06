function insert(arr) {
    let temp;
    for (let i = 1; i < arr.length; i++) {
        temp = arr[i];
        for (var j = i - 1;j >= 0 && arr[j] > temp;j--) {
            arr[j + 1] = arr[j];
        }
        // console.log(j + 1);
        arr[j + 1] = temp;
    }
    return arr;
}

let arr = [9,8,7,6,5,4,3,2,1];
console.log(insert(arr));