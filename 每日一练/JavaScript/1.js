function foo() {
    this.a = 1;
    this.b = 2;
}

function bar() {
    this.c = 3;
    this.d = 4;
}

var seed = new foo()

foo.prototype.fus = function (fn) {
    fn.property = seed
    console.log(seed);
    seed = new fn
    console.log(seed);
    console.log(this);
    return this
}

var a = seed.fus(bar)

console.log(a.c);