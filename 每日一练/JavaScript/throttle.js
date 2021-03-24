
/**
 *
 *
 * @param {*} callback  传入的回调函数
 * @param {*} delay   间隔执行时间
 * @param {boolean} [options={
 *     leading: true,  是否立即执行
 *     trailing: true   最后一次是否执行
 * }]
 * @return {*} 
 */
function throttle(callback, delay, options = {
    leading: true,
    trailing: true
}) {
    let previous = 0;
    let timer = null;
    let result;
    return function () {
        let context = this;
        if (Date.now() - previous >= delay && options.leading) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            result = callback.apply(context, arguments);
            previous = Date.now();
        } else if (!timer && options.trailing) {
            timer = setTimeout(() => {
                result = callback.apply(context, arguments);
                previous = Date.now();
                timer = null;
            }, delay);
        }
        return result;
    }
}

// 时间戳方法，会立即调用，但是最后一次不会调用
// function throttle(callback, delay) {
//     let previous = 0;
//     return function () {
//         let context = this;
//         if (Date.now() - previous >= delay) {
//             callback.apply(context, arguments);
//             previous = Date.now();
//         }
//     }
// }


// 时间戳方法，不会立即调用，但是最后一次会调用
// function throttle(callback, delay) {
//     let timer = null;
//     let context;
//     return function () {
//         context = this;
//         if (!timer) {
//             timer = setTimeout(() => {
//                 callback.apply(context, arguments);
//                 timer = null;
//             }, delay);
//         }
//     }
// }