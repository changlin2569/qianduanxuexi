Function.prototype.fakeApply = function(context, args) {
    if (context === undefined && context === null) {
        context = window;
    } else {
        context = Object(context);
    }
    args = Array.from(args);
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}