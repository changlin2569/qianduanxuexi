function merge(arr) {
    if (arr.length > 1) {
        let middle = arr.length / 2;
        let left = merge(arr.slice(0, middle));
        let right = merge(arr.slice(middle));
        arr = mergeSort(left, right);
        // console.log(arr);
    }
    return arr;
}

function mergeSort(left, right) {
    let [i, j] = [0, 0];
    let prev = [];
    while (i < left.length && j < right.length) {
        left[i] < right[j] ? prev.push(left[i++]) : prev.push(right[j++]);
    }
    console.log(prev.concat(i < left.length ? left : right));
    return prev.concat(i < left.length ? left : right);
}

console.log(merge([8,7,6,5,4,3,2,1]));