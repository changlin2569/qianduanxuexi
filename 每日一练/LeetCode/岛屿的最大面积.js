let count = 0

var maxAreaOfIsland = function (grid) {
    let res = 0
    let [lenX, lenY] = [grid.length, grid[0].length]
    for (let i = 0; i < lenX; i++) {
        for (let j = 0; j < lenY; j++) {
            if (grid[i][j] === 1) {
                _maxAreaOfIsland(grid, i, j)
                res = Math.max(count, res)
            }
            count = 0
        }
    }
    console.log(res);
    return res
};

function _maxAreaOfIsland(grid, i, j) {
    if (i < 0 ||
        j < 0 ||
        i >= grid.length ||
        j >= grid[0].length ||
        grid[i][j] === 0) {
        return
    }
    grid[i][j] = 0
    count++
    _maxAreaOfIsland(grid, i - 1, j)
    _maxAreaOfIsland(grid, i, j + 1)
    _maxAreaOfIsland(grid, i + 1, j)
    _maxAreaOfIsland(grid, i, j - 1)
}

maxAreaOfIsland([[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]
)