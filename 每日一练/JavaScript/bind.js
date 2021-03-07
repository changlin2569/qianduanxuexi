Function.prototype.fakeBind = function(context, ...options) {
    if (typeof this !== 'function') {
        throw('not a function');
    }
    context.fn = this;
    const result = context.fn;
    delete context.fn;
    return function() {
        result(...options, ...arguments);
    }
}