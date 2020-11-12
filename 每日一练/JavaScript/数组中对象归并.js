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
        custome: ['CUS1', 'CUS2']
    },
    {
        company: 'COM2',
        custome: ['CUS3']
    }
  ]

function classy(inArr) {
    let arr = [];
    for (let i = 0;i < inArr.length - 1;i++) {
        if (inArr[i].company == inArr[i + 1].company) {
            continue;
        }
        for (let j = 0;j < inArr.length;j++) {
            if (inArr[i].company == inArr[j].company) {
                arr.push(inArr[j].customer);
            }
        }
        inArr[i].customer = arr;
        arr = [];
    }
    return inArr;
}

console.log(classy(inArr));
// console.log(inArr[1].company);
