function parseUrl(url) {
    if (!url.trim()) {
        return
    }
    url = decodeURI(url)
    const cur = url.indexOf('?')
    if (cur !== -1) {
        const res = {}
        const params = url.substr(cur + 1).split('&')
        for (const item of params) {
            const [key, value] = item.split('=')
            if (key in res) {
                if (!Array.isArray(res[key])) {
                    res[key] = [res[key]]
                }
                res[key].push(value)
            } else {
                value ? (res[key] = value) : (res[key] = true)
            }
        }
        return res
    }
}

let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';

console.log(parseUrl(url));