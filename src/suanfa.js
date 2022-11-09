/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums.sort((a, b) => {
        return a - b
    })
    let start = ''
    let result = []
    for (let i = 0; i < nums.length; i++) {
        if (start !== nums[i]) {
            start = nums[i]
            let left = i + 1;
            let right = nums.length - 1;
            while (left < right) {
                let sum = nums[left] + nums[right] + start
                if (sum == 0) {
                    let arr = [start, nums[left], nums[right]]
                    result.push(arr)
                    let addNum = 1
                    while (nums[left + addNum] == nums[left]) {
                        addNum++
                    }
                    left += addNum
                }
                if (sum < 0) {
                    left++
                }
                if (sum > 0) {
                    right--
                }
            }
        }
    }
    console.log(result)
}
threeSum([0, 0, 0])