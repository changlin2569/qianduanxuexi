//实现以下输出
let inArr = [
    {
        company: 'COM1',
        customer: 'CUS1'
    },
    {
        company: 'COM1',
        customer: 'CUS2',
    },
    {
        company: 'COM2',
        customer: 'CUS3'
    }
  ];
  let outArr = [
    {
        company: 'COM1',
        customer: ['CUS1', 'CUS2']
    },
    {
        company: 'COM2',
        customer: ['CUS3']
    }
  ]

function classy(inArr) {
    let inMap = new Map();
    let item;
    let outArr = [];
    for (let i = 0; i < inArr.length; i++) {
        if (inMap.has(inArr[i].company)) {
            item = inMap.get(inArr[i].company);
            item = item + ',' + inArr[i].customer;
            inMap.set(inArr[i].company, item);
            continue;
        }
        inMap.set(inArr[i].company, inArr[i].customer);
    }
    for (let i of inMap) {
        let obj = {
            [i[0]]: i[1]
        }
        outArr.push(obj);
    }
    return outArr;
}


// ----------------------------------------------------------------------------
function classyPlus(arr) {
    if (!Array.isArray(arr) || !arr.length) {
        return
    }
    const map = new Map();
    const res = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        if (map.has(arr[i].company)) {
            let cur = map.get(arr[i].company);
            if (!Array.isArray(cur.customer)) {
                let res = [];
                res.push(cur.customer, arr[i].customer);
                cur.customer = res;
            } else {
                cur.customer.push(arr[i].customer);
            }
        } else {
            map.set(arr[i].company, arr[i]);
            res.push(arr[i])
        }
    }
    return res
}

console.log(classy(inArr));
