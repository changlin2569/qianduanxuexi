(function () {
    var _this = (typeof window === 'object' && window) || (typeof global === 'object' && global);

    const Util = {
        // 添加事件
        addEvent: function (el, type, fn) {
            if (window.addEventListener) {
                el.addEventListener(type, fn, false);
            } else if (window.attachEvent) {
                el.attachEvent('on' + type, fn);
            } else {
                el['on' + type] = fn;
            }
            return fn;
        },
        // 移除事件
        removeEvent: function (el, type, fn) {
            if (window.removeEventListener) {
                el.removeEventListener(type, fn);
            } else {
                el.detachEvent('on' + type, fn);
            }
        },
        // 对象拷贝
        assign: function (target, defaults, options) {
            if (options && Object.prototype.toString.call(options) !== '[object Object]') {
                throw new Error('Please pass right parameters')
            }
            for (let i = 1; i < arguments.length; i++) {
                for (let key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key)) {
                        target[key] = arguments[i][key]
                    }
                }
            }
            return target
        },
        // 获取视口高度
        getViewHeight: function () {
            return Math.max(window.innerHeight, document.documentElement.clientHeight);
        },
        // 获取视口宽度
        getViewWidth: function () {
            return Math.max(window.innerWidth, document.documentElement.clientWidth);
        }
    }

    LazyLoad = function (options) {
        this.options = Util.assign({}, LazyLoad.defaults, options);
        this.init();
    }

    LazyLoad.defaults = {
        onload: null,
        useDebounce: false,
        delay: 250,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    var proto = LazyLoad.prototype;

    proto.init = function () {
        this.setOptions();
        this.bindRender();
    }

    proto.setOptions = function () {
        this.options.top = 0 - this.options.top;
        this.options.bottom = Util.getViewHeight() + this.options.bottom
        this.options.left = 0 - this.options.left;
        this.options.right = Util.getViewWidth() + this.options.right;
    }

    proto.bindRender = function () {
        // 滚动时触发render
        const scrollEvent = Util.addEvent(_this, 'scroll', this.lazyLoadHandler.bind(this));
        // 页面首次加载完成触发
        const onloadEvent = Util.addEvent(_this, 'load', this.lazyLoadHandler.bind(this));

        this.events = {
            scrollEvent,
            onloadEvent
        }
    }

    var timer = null;

    proto.lazyLoadHandler = function () {
        if (this.options.useDebounce) {
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                this.render();
            }, this.options.delay)
        } else {
            if (Date.now() - timer >= this.options.delay) {
                this.render();
                timer = Date.now();
            }
        }
    }


    proto.checkView = function (element) {
        var rect = element.getBoundingClientRect();

        return (rect.right >= this.options.left && rect.bottom >= this.options.top && rect.left <= this.options.right && rect.top <= this.options.bottom);
    }

    proto.render = function () {
        let lazyChilds = document.querySelectorAll('[data-lazy-src], [data-lazy-background]');
        let len = lazyChilds.length;

        for (let i = 0; i < len; i++) {
            if (this.checkView(lazyChilds[i])) {
                if (lazyChilds[i].getAttribute('data-lazy-src')) {
                    let src = lazyChilds[i].getAttribute('data-lazy-src')
                    lazyChilds[i].src = src;
                } else if (lazyChilds[i].getAttribute('data-lazy-background')) {
                    lazyChilds[i].backgroundImage = 'url(' + lazyChilds[i].getAttribute('data-lazy-background') + ')';
                }
                
                lazyChilds[i].removeAttribute('data-lazy-src');

                if (this.options.onload && typeof this.options.onload === 'function') {
                    this.options.onload(lazyChilds[i])
                }
            }

        }

        if (!len) {
            this.removeRender()
        }
    }

    proto.removeRender = function() {
        Util.removeEvent(_this, 'scroll', this.events.scrollEvent);
        Util.removeEvent(_this, 'load', this.events.onloadEvent);
    }
})()