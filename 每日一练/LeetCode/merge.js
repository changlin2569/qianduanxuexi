var merge = function (nums1, m, nums2, n) {
    let [len1, len2, len] = [m - 1, n - 1, nums1.length - 1]
    while (len2 >= 0) {
        if (len1 < 0) {
            nums1[len--] = nums2[len2--]
        }
        nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--]
    }
    console.log(nums1);
};

merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)