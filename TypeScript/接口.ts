interface Person {
    name: string;
    age: number;
    school: string;
    // 可选属性
    weight?: number;
    // 索引签名
    [propName: string]: any;
    // 函数
    say(): string;
}

// 此接口继承了Person接口，在原来的类型检查上多了msg类型检查
interface Message extends Person {
    msg: string;
}

function getInfo(person: Person) {
    console.log(person.name + person.age + person.school);
}

let person = {
    name: 'cl',
    age: 18,
    school: 'xupt',
    height: 100,
    say() {
        return this.name
    }
}

getInfo(person)