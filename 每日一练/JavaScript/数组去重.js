let arr = [8,1,1,2,3,3,3,4,6,4,77];
let arr1 = [];

for(let i = 0;i < arr.length;i++){
    for(let j = i + 1;j < arr.length;j++){
        if(arr[j] == arr[i]){
            arr.splice(j,1);
        }
    }
}

console.log(arr);