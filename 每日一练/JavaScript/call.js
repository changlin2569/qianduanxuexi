Function.prototype.fakeCall = function(context) {
    context = context || window;
    context.f = this;
    const args = arguments.slice(1);
    return context.f(...args);
}

