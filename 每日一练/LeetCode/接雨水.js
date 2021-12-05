var trap = function (height) {
    let res = 0
    let [left, right] = [0, 0]
    for (let i = 1; i < height.length; i++) {
        ;[left, right] = [0, 0]
        for (let l = i; l >= 0; l--) {
            left = Math.max(left, height[l])
        }
        for (let r = i; r < height.length; r++) {
            right = Math.max(right, height[r])
        }
        res += Math.min(left, right) - height[i]
    }
    console.log(res)
    return res
}

trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])