// 拦截器类
class Interceptor {

    constructor() {
        this.handles = { }
    }

    use(fullField, rejected) {
        this.handles = {
            fullField,
            rejected
        }
    }
}




class Axios {

    constructor() {
        this.interceptors = {
            request: new Interceptor(),
            response: new Interceptor()
        }
    }

    request(config) {
        const { fullField: reqFullField, rejected: reqRejected } = this.interceptors.request.handles
        const { fullField: resFullField, rejected: resRejected } = this.interceptors.response.handles
        const reqPromise = Promise.resolve(config).then(reqFullField, reqRejected)
        const resPromise = reqPromise.then(this.sendAjax)
        return resPromise.then(resFullField, resRejected)
    }

    sendAjax(config) {
        return new Promise((resolve, reject) => {
            const { url, method = 'get', params = { } } = config;
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        resolve(xhr.responseText);
                    } else {
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.send(params);
        })
    }
}


// 方法挂载在axios.prototype上，内部执行request方法
const methodList = ['get', 'post', 'put', 'delete', 'head', 'options']

methodList.forEach(method => {
    Axios.prototype[method] = function () {
        if (['get', 'delete', 'head', 'options'].includes(method)) {
            return this.request({
                method,
                url: arguments[0],
                ...arguments[1] || { },
            })
        } else {
            return this.request({
                method,
                url: arguments[0],
                params: arguments[1] || { },
                ...arguments[2] || { },
            })
        }
    }
})

const utils = {
    extends: function (target, source, thisArg) {
        if ((target && typeof target === 'function') && (source && typeof source === 'object')) {
            // Object.keys 方法不会遍历原型链上的属性
            Object.keys(source).forEach(key => {
                if (typeof source[key] === 'function') {
                    target[key] = source[key].bind(thisArg);
                } else {
                    target[key] = source[key];
                }
            })
            return true;
        }
        return false;
    }
}



function createAxiosFn() {
    const axios = new Axios();
    const request = axios.request.bind(axios);
    utils.extends(request, Axios.prototype, axios)
    // utils.extends(request, Object.getPrototypeOf(axios), axios);
    // 混入拦截器对象
    utils.extends(request, axios, axios)
    return request
}

const axios = createAxiosFn();