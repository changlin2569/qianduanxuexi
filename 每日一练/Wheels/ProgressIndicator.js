
(function() {
    var _this = (typeof window === "object" && window) || (typeof global === "object" && global);


    let Util = {
        assign: function(target) {
            let length = arguments.length;
            for (let i = 0; i < length; i++) {
                for (let key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key)) {
                        target[key] = arguments[i][key];
                    }
                }
            }
            return target;
        },
        isListener: function(listener) {
            if (typeof listener === 'function') {
                return true;
            } else if (typeof listener === 'object') {
                Util.isListener(listener);
            }
            return false;
        },
        indexOf: function(eventName, event) {
            let _index = -1;
            let current = typeof event === 'function' ? event : event.listener;
            for (let i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i].listener === current) {
                    _index = i;
                    break;
                }
            }
            return _index;
        },
        // 获取可见区域的高
        getViewHeight: function() {
            if (window.innerHeight !== null) {
                return window.innerHeight;
            } else if (document.documentElement.clientHeight !== null) {
                return document.documentElement.clientHeight;
            }
        },
        // 获取被卷去部分的高
        getScrollHeight : function() {
            if (window.pageYOffset !== null) {
                return window.pageYOffset;
            } else if (document.documentElement.scrollTop !== null) {
                return document.documentElement.scrollTop;
            }
        }
    }

    ProgressIndicator = function(options) {
        this.events = {};
        this.options = Util.assign({}, this.constructor.defaults, options);
        this.init()
    }

    ProgressIndicator.defaults = {
        color: "#0A74DA"
    }

    ProgressIndicator.prototype.on = function(eventName, event) {
        if (!eventName || !event) {
            return
        } else if (Util.isListener(event)) {
            throw new Error('event must be a function');
        }
        this.events[eventName] = this.events[eventName] || [];
        if (!~Util.indexOf(eventName, event)) {
            event.once ? this.events[eventName].push(event) : this.events[eventName].push({
                listener: event,
                once: false
            })
            return true;
        }
        return false;
    }

    ProgressIndicator.prototype.once = function(eventName, event) {
        if (!eventName || !event) {
            return
        } else if (Util.isListener(event)) {
            throw new Error('event must be a function');
        }
        return this.on(eventName, {
            listener: event,
            once: true
        })
    }

    ProgressIndicator.prototype.emit = function(eventName, args) {
        if (!this.events[eventName]) {
            throw new Error('EventName is not defined');
        }
        let eventArr = this.events[eventName];
        for (let i = 0;i < eventArr.length;i++) {
            eventArr[i].listener.apply(this, args);
            if (eventArr[i].once) {
                eventArr.splice(i, 1);
                i--;
            }
        }
        return true
    }

    ProgressIndicator.prototype.createProgress = function() {
        let div = document.createElement('div');
        div.className = 'progress-indicator';
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.left = '0';
        div.style.height = '3px';
        div.style.backgroundColor = this.options.color;
        document.body.appendChild(div);
    }

    ProgressIndicator.prototype.get

    _this.ProgressIndicator = ProgressIndicator;
})()