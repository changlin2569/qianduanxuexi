(function() {
    const _this = ((typeof window === 'object') && window) || ((typeof Global === 'object') && global);
    _this.EventEmitter = function() {
        this.events = {}
    }

    let Util = {
        isFunction(fn) {
            if (typeof fn === 'function') {
                return true
            } else if (typeof fn === 'object') {
                return typeof fn.listener === 'function'
            }
            return false
        },

        indexOf(objFn, eventArr) {
            let _index = -1;
            let current = (typeof objFn === 'function') ? objFn : objFn.listener 
            for (let i = 0; i < eventArr.length; i++) {
                if (eventArr[i].listener === current) {
                    _index = i;
                    break;
                }
            }
            return _index
        },

        isError(eventName, listener) {
            if (!eventName || !listener) {
                throw new Error('Please pass parameters')
            } else if (!Util.isFunction(listener)) {
                throw new Error('listener must be a function');
            }
        }
    }
    
    EventEmitter.prototype.on = function(eventName, listener) {
        Util.isError(eventName, listener);
        this.events[eventName] = this.events[eventName] || [];
        let once = typeof listener === 'object' ? true : false;
        if (Util.indexOf(listener, this.events[eventName]) === -1) {
            if (!once) {
                this.events[eventName].push({
                    listener,
                    once
                });
            } else {
                this.events[eventName].push(listener);
            }
        }
        return this;
    }
    
    EventEmitter.prototype.once = function (eventName, listener) {
        Util.isError(eventName, listener);
        let once = true;
        this.on(eventName, {
            listener,
            once
        })
        return this;
    }
    
    EventEmitter.prototype.emit = function(eventName, args) {
        if (!eventName) {
            throw new Error('Please pass parameters')
        } else if (!this.events[eventName]) {
            return
        }
        for (let i = 0; i < this.events[eventName].length; i++) {
            let { listener, once } = this.events[eventName][i];
            listener.apply(this, args);
            if (once) {
                this.events[eventName].splice(i, 1);
                i--;
            }
        }
        return this
    }
    
    EventEmitter.prototype.off = function (eventName, listener) {
        Util.isError(eventName, listener);
        this.events[eventName] = this.events[eventName].filter(item => item.listener !== listener)
        return this;
    }
    
    EventEmitter.prototype.allOff = function (eventName) {
        if (!eventName) {
            this.events = {};
            return
        } else if (!this.events[eventName]) {
            return 'no eventName'
        }
        this.events[eventName] = null;
    }
})()