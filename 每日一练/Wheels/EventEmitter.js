(function() {
    EventEmitter = function() {
        this.events = {}
    }
    
    EventEmitter.prototype.on = function(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
        return this;
    }
    
    EventEmitter.prototype.once = function (eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        listener.once = true;
        this.events[eventName].push(listener);
        return this;
    }
    
    EventEmitter.prototype.emit = function(eventName, args) {
        if (!this.events[eventName]) {
            return 'no eventName'
        }
        for (let i = 0; i < this.events[eventName].length; i++) {
            // console.log(this.events[eventName][i]);
            this.events[eventName][i](...args);
            if (this.events[eventName][i].once) {
                this.events[eventName].splice(i,1);
                i--
            }
        }
        return this
    }
    
    EventEmitter.prototype.off = function (eventName, listener) {
        if (!this.events[eventName]) {
            return 'no eventName'
        }
        this.events[eventName] = this.events[eventName].filter(item => item !== listener)
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