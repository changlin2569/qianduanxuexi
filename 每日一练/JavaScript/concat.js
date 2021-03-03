// function concat (arr,arr1) {

//     return [...arr,...arr1];
// }

function concat(arr, arr1) {
    let index = arr.length;
    for (let i = 0; i < arr1.length; i++) {
        arr[index] = arr1[i];
        index++;
    }
    return arr;
}

let arr = [1, 2, 3];
let newarr = [4, 5, 6, 7];
// console.log(concat(arr, newarr));

class Concat {
    constructor(arr) {
        this.arr = arr;
    }
    concat(arr, arr1) {
        let index = arr.length;
        for (let i = 0; i < arr1.length; i++) {
            arr[index] = arr1[i];
            index++;
        }
        this.arr = arr;
        // console.log(arr);
        // console.log(this);
    }
}

let newArr = new Concat(arr);
newArr.concat(arr, newarr);
console.log(newArr.arr);