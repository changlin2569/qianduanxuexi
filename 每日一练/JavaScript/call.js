Function.prototype.fakeCall = function (context) {
    if (context === null && context === undefined) {
        context = window;
    } else {
        context = Object(context);
    }
    context.f = this;
    const args = [...arguments].slice(1);
    const result = context.f(...args);
    delete context.f;
    return result;
}

var obj = {
    color: 'black'
};
var color = 'red';

function logColor() {
    console.log(this.color);
}

logColor.fakeCall();