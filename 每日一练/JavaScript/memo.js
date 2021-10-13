function memo(func, resolver) {
	// your code here
	const cache = resolver ? resolver() : null
	let res, params = []
	return function (...args) {
		params.length || params.push(...args)
		if (cache) {
			res = res ? res : func.apply(this, args)
			return res
		}
		const flag = params.every((item, i) => item === args[i])
		if (flag) {
			res = res ? res : func.apply(this, args)
			return res
		} else {
			return func.apply(this, args)
		}
	}
}

const func = (arg1, arg2) => {
	console.log(1);
	return arg1 + arg2
}

// const memoed = memo(func)
const memoed = memo(func, () => 'aaa')

console.log(memoed(1, 2));
// 3， func 被调用

console.log(memoed(1, 2));
// 3，func 未被调用 

console.log(memoed(1, 3));
  // 4，新参数，func 被调用