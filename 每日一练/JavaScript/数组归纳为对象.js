let arr = [1,1,2,4,3,3,1,2,4,5];

function arrObj (arr) {
    if (arr.length == 0) {
        return;
    } else {
        let index = 0;
        let obj = {};
        for (let i = 0;i < arr.length;i++) {
            for (let j = 0;j < arr.length;j++) {
                if (arr[i] == arr[j]){
                    index++;
                }
            }
            obj[arr[i]] = index;
            index = 0;
        }
        return obj;
    }
}

console.log(arrObj(arr));