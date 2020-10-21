let arr = [12, 43, 63, 73, 4, 6, 223, 76, 48, 59, 77];

// for(let j = 0;j < arr.length - 1;j++){
//     for(let i = 0;i <= arr.length - j;i++){
//         if(arr[i] > arr[i - 1]){
//             [arr[i],arr[i - 1]] = [arr[i - 1],arr[i]];
//         }
//     }
// }

// let arr1 = arr.every(() => {
//     for (let i = 0; i < arr.length - 1; i++) {
//         if (arr[i] > arr[i - 1]) {
//             [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
//         }
//     }});


arr.forEach(() => {
    for(let j = 0;j <= arr.length - 1;j++){
        if(arr[j] > arr[j - 1]){
            [arr[j],arr[j - 1]] = [arr[j - 1],arr[j]];
        }
    }
})

        console.log(arr);

        