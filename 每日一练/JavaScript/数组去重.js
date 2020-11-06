const {
    findSourceMap
} = require("module");
const {
    isArray
} = require("util");

let arr = [8, 1, 1, 2, 3, 3, 3, 4, 6, 4, 77];

// for(let i = 0;i < arr.length;i++){
//     for(let j = i + 1;j < arr.length;j++){
//         if(arr[j] == arr[i]){
//             arr.splice(j,1);
//             j--;
//         }
//     }
// }

// 1 基本方法
function removal(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] == arr[i]) {
                arr.splice(j, 1);
                j--; //防止跳过元素
            }
        }
    }
    console.log(arr);
}

// removal(arr);

//2 set构造函数去重
// let reArr = new Set(arr);
let setArr = [...new Set(arr)];
// console.log(setArr);

// 3 array.indexof方法去重
function indexofRemoval(arr) {
    for (let i = 0; i < arr.length; i++) {
        let index = arr.indexOf(arr[i], i + 1);
        // console.log(index);
        if (index != -1) {
            arr.splice(index, 1);
            i--;
        }
    }
    console.log(arr);
}

// indexofRemoval(arr);

//4 indexOf + 新数组
function indexOfNewarr(arr) {
    if (arr.length == 0) {
        return;
    } else {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            // console.log(arr[i]);
            // console.log(arr.indexOf(arr[i]));
            if (arr.indexOf(arr[i], i + 1) == -1) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }
}

// console.log(indexOfNewarr(arr));

// 5 includes去重
function includesArr(arr) {
    if (arr.length == 0) {
        return;
    } else {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (!newArr.includes(arr[i])) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }
}

// console.log(includesArr(arr));
// 6. indexof + filter方法去重
function mapArray (arr) {
    if (arr.length == 0) {
        return;
    } else {
        let newArr = [];
        [...newArr] = arr.filter((item,index) => {
            if (arr.indexOf(item,index + 1) == -1) {
                return item;
            }
        })
        return newArr;
    }
}

// console.log(mapArray(arr));

function reduceArr(arr) {
    if (arr.length == 0) {
        return;
    } else {
        return arr.reduce((newArr,item) =>
        newArr.includes(item) ? newArr : [...newArr,item],[]);
    }
}

console.log(reduceArr(arr));