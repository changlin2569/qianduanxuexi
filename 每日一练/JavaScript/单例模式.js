class SingleDog {
    constructor(name) {
        this.name = name
    }

    static getInstance(...args) {
        if (!SingleDog.instance) {
            SingleDog.instance = new SingleDog(...args)
        }
        return SingleDog.instance
    }
}

const obj1 = SingleDog.getInstance('cl')

const obj2 = SingleDog.getInstance('lcls')

console.log(obj1);
console.log(obj2);