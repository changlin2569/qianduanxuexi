const list = [1, 2, 3]
const square = num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * num)
        }, 1000)
    })
}

function test() {
    list.forEach(async x => {
        const res = await square(x)
        // console.log(res)
        if (x === 1) {
            console.log(res)
        } else {
            setTimeout(() => {
                console.log(res)
            }, (x - 1) * 1000)
        }
    })
}
test()