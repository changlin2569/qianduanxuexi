// let promise = new Promise((res,rej) => {
//     setTimeout(function(){
//         if(true){
//             res("chenggong")
//         }else{
//             rej("shibai")
//         }
//     },2000)
// })

// promise.then(res =>{
//     console.log(res);
// })

function fn1(){
    return new Promise((res,rej) => {
        res('11');
    })
}
function fn2(){
    return new Promise((res,rej) => {
        res('12');
    })
}
function fn3(){
    return new Promise((res,rej) => {
        res('13');
    })
}

fn1().then(res =>{
    console.log(res);
    return fn2()
})
.then(res => {
    console.log(res);
    return fn3()
})
.then(res => {
    console.log(res);
})

