let arr = [12, 43, 63, 73, 4, 6, 223, 76, 48, 59, 77];

for(let i = 0;i < arr.length;i++){
    for(let i = 0;i < arr.length - 1;i++){
        if(arr[i] > arr[i - 1]){
            [arr[i],arr[i - 1]] = [arr[i - 1],arr[i]];
        }
    }
}

// let arr1 = arr.every(() => {
//     for (let i = 0; i < arr.length - 1; i++) {
//         if (arr[i] > arr[i - 1]) {
//             [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
//         }
//     }});

        console.log(arr);