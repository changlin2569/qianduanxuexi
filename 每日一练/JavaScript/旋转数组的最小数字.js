function minNumberInRotateArray(rotateArray) {
    let left = 0;
    let right = rotateArray.length - 1;
    let mid;
    while (left < right) {
        mid = Math.floor((left + right) / 2);
        if (rotateArray[right] < rotateArray[mid]) {
            left = mid + 1;
        } else if (rotateArray[right] == rotateArray[mid]) {
            right--;
        } else {
            right = mid;
        }
    }
    return rotateArray[right]
}

console.log(minNumberInRotateArray([1,0,1,1]));