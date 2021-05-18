(function () {
    const _this = ((typeof window === 'object') && window) || ((typeof global === 'object') && global);

    const util = {
        assign: function (target, defaults, options) {
            if (options && Object.prototype.toString.call(options) !== '[object Object]') {
                throw new Error('please give right options')
            }
            for (let i = 0; i < arguments.length; i++) {
                for (let key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key)) {
                        target[key] = arguments[i][key]
                    }
                }
            }
            return target
        },
        getElement: function (selector) {
            if (!selector) {
                throw new Error('please pass parameters')
            }
            let el;
            if (typeof selector === 'string') {
                el = document.querySelector(selector);
            } else {
                el = selector;
            }
            return el;
        },
        getScrollTop: function () {
            if (window.pageYOffset !== null) {
                return window.pageYOffset;
            } else if (document.documentElement.scrollTop !== null) {
                return document.documentElement.scrollTop;
            }
            return document.body.scrollTop;
        },
        addEvent: function (type, el, cb) {
            if (!type || !el) {
                throw new Error('addEvent defeat')
            }
            if (window.addEventListener) {
                window.addEventListener(type, cb, false);
            } else {
                window.attachEvent('on' + type, cb);
            }
            return cb;
        },
        indexOf: function (arr, item) {
            let flag = -1;
            for (let i = 0; i < arr.length; i++) {
                arr[i] === item && (flag = i);
            }
            return flag;
        }
    }

    _this.EventEmitter = function () {
        this.events = {};
    }

    EventEmitter.prototype.on = function (eventName, cbObj) {
        if (!eventName || !cbObj) {
            return
        }
        this.events[eventName] = this.events[eventName] || [];
        let callback = typeof cbObj === 'function' ? cbObj : cbObj.cb
        if (!~util.indexOf(this.events[eventName], callback)) {
            cbObj.once ? this.events[eventName].push(cbObj) : this.events[eventName].push({
                cb: callback,
                once: false
            })
        }
        return this
    }

    EventEmitter.prototype.once = function (eventName, cb) {
        if (!eventName || !cbObj) {
            return
        }
        return this.on(eventName, {
            cb,
            once: true
        })
    }

    EventEmitter.prototype.emit = function (eventName) {
        if (!eventName || !this.events[eventName]) {
            return
        }
        const len = this.events[eventName].length;
        for (let i = 0; i < len; i++) {
            this.events[eventName][i].cb.apply(this)
            if (this.events[eventName][i].once) {
                this.events[eventName].splice(i, 1)
                i--
            }
        }
        return this
    }

    _this.Sticky = function (selector, options) {
        EventEmitter.call(this)
        this.selector = util.getElement(selector);
        this.options = util.assign({}, Sticky.defaults, options);
        this.top = this.selector.getBoundingClientRect().top + util.getScrollTop() - this.options.offset;
        this.init();
    }

    Sticky.defaults = {
        offset: 0
    }

    const proto = Sticky.prototype = new EventEmitter();

    proto.constructor = Sticky;

    proto.init = function () {
        this.setPosition();
        this.bindScroll();
    }

    proto.bindScroll = function () {
        let flag = false;
        util.addEvent('scroll', this.selector, () => {
            if (util.getScrollTop() > this.top) {
                if (!flag) {
                    if (this.selector.className === 'sticky') {
                        return
                    }
                    this.selector.className = 'sticky';
                    this.emit('onStick')
                    flag = true;
                }
            } else {
                if (flag) {
                    this.emit('onDetach')
                    this.selector.className = ''
                    flag = false;
                }
            }
        });
    }

    proto.setPosition = function () {
        this.selector.style.position = 'sticky';
        this.selector.style.top = this.options.offset + 'px';
    }
})()