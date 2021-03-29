function isValid(s) {
    let stack = [];
    let sArr = s.split('');
    let flag = true;
    for (let i = 0; i < sArr.length; i++) {
        if (sArr[i] === '(' || sArr[i] === '[' || sArr[i] === '{') {
            stack.push(sArr[i]);
        } else {
            switch(sArr[i]) {
                case ')': 
                    flag = stack.pop() === '(';
                    break;
                case '}':
                    flag = stack.pop() === '{';
                    break;
                case ']':
                    flag = stack.pop() === '[';
                    break;
            }
        }
        if (!flag) {
            break;
        }
    }
    if (stack.length !== 0) {
        return false;
    }
    return flag;
}

console.log(isValid('('));