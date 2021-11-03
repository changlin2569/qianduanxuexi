const str1 = 'aaaabbaa'
const str2 = 'aa'

function test(str1, str2) {
    if (!str2.trim()) {
        return
    }
    const len = str2.length
    let j = res = 0
    for (let i = 0; i <= str1.length; i++) {
        if (i !== 0 && i % len === 0) {
            let temp = str1.slice(j, i)
            console.log(temp);
            temp === str2 && res++
            j = i
        }
    }
    console.log(res)
    return res
}

test(str1, str2)