// 基础静态类型
var str = 'Hello';
var num = 9;
var flag = false;
// 对象静态类型
var obj = {
    name: 'cl',
    age: 18
};
// 类
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
var person = new Person;
// 函数  必须是函数且返回值为string类型
var bar = function () { return 'hello bar'; };
// 数组   数组中成员的类型必须是string
// let arr: string[] = ['cl', 'name', 'age']
var arr = ['cl', 'name', 'age'];
