function lastStoneWeight(stones) {
    var stones = stones.sort((a, b) => {
        return b - a;
    })
    if (stones.length <= 1) {
       return stones.length ? stones[0] : 0;
    }
    else {
        if (stones[0] != stones[1]) {
            stones.push(stones[0] - stones[1]);
        }
        stones.splice(0,2);
        return lastStoneWeight(stones);
    }
}

console.log(lastStoneWeight([2,7,4,1,8,1]));