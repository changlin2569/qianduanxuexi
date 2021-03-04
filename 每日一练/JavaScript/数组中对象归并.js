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

console.log(classy(inArr));
