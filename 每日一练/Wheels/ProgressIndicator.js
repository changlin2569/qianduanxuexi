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
        isListener: function() {
            
        }
    }

    ProgressIndicator = function(options) {

    }

    _this.ProgressIndicator = ProgressIndicator;
})()