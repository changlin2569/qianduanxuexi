/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
    if (!nums.length) {
        return
    }
    let middle;
    let left = 0;
    let right = nums.length - 1;
    while(left <= right) {
        middle = Math.floor((right + left) / 2);
        console.log(middle);
        if (nums[middle] === target) {
            return middle
        }
        if (nums[middle] >= nums[left]) {
            if (target >= nums[left] && target < nums[middle]) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        } else {
            if (target > nums[middle] && target <= nums[right]) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
    }
    return -1
};

console.log(search([3,1], 1))