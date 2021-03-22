/**
 *
 *
 * @param {*} callback  防抖执行回调函数
 * @param {*} delay   时间间隔
 * @param {boolean} [immediate=false]  是否立即执行
 * @return {*} 
 */
function debounce(callback, delay, immediate = false) {
    let timeout;
    // 可能需要返回值
    let result;
    let debounced = function () {
        // 保存this的值
        let context = this;
        // 保存调用的参数
        let args = arguments;
        if (timeout) {
            clearTimeout(timeout);
        }
        // 立即执行
        if (immediate) {
            let now = !timeout;
            if (now) {
                result = callback.apply(context, args);
            }
            timeout = setTimeout(function () {
                timeout = null;
            }, delay);
        } else {
            timeout = setTimeout(function () {
                result = callback.apply(context, args);
            }, delay);
        }
        // 返回返回值
        return result;
    }
    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
        result = null;
    }
    return debounced;
}