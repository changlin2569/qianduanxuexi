// 基础静态类型
let str: string = 'Hello'

let num: number = 9

let flag: boolean = false

// 对象静态类型
let obj: {
    name: string,
    age: number
} = {
    name: 'cl',
    age: 18
}

// 类
class Person {}
let person: Person = new Person

// 函数  必须是函数且返回值为string类型
let bar: () => string = () => 'hello bar'

// 数组   数组中成员的类型必须是string
// let arr: string[] = ['cl', 'name', 'age']
// let arr: Array<string> = ['cl', 'name', 'age']