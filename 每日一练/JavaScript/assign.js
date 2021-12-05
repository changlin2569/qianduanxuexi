/*
 * @Author: your name
 * @Date: 2021-10-15 15:49:31
 * @LastEditTime: 2021-10-15 15:55:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\每日一练\JavaScript\assign.js
 */

function objectAssign(target, ...sources) {
    // your code here
    if (target == null) {
        throw Error('error')
    }
    target = Object(target)
    for (const source of sources) {
        if (source == null) {
            continue
        }
        const keys = Object.keys(source).concat(Object.getOwnPropertySymbols(source))
        for (const key of keys) {
            const temp = Object.getOwnPropertyDescriptor(target, key)
            if (temp) {
                if (!temp.writable) {
                    throw Error('error')
                }
            }
            target[key] = source[key]
        }
    }
    return target
}


const bool = true
const a = Object.assign(1, { a: 3 })
const b = objectAssign(1, { a: 3 })

console.log(a)
console.log(b)
