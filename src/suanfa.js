var largestSumAfterKNegations = function (nums, k) {
    if (nums.length == 0) {
        return 0;
    }
    var zArr = []
    var fArr = []
    nums.forEach(item => {
        if (item === -0) {
            fArr.push(item)
        }
        if (item === 0) {
            zArr.push(item)
        } else if (item >= 0) {
            zArr.push(item)
        } else {
            fArr.push(item)
        }
    })
    zArr.sort((i, j) => {
        return i - j
    })
    fArr.sort((i, j) => {
        return i - j
    })
    if (k <= fArr.length) {
        console.log(fArr)
        fArr.map(((item, index) => {
            if (index + 1 <= k) {
                fArr[index] = -fArr[index]
            }
        }))
        console.log(fArr)
        zArr = zArr.concat(fArr)
        let resNum = 0;
        zArr.forEach(item => {
            resNum += item;
        })
        return resNum
    } else {
        fArr.map(((item, index) => {
            fArr[index] = -fArr[index]
        }))
        zArr = zArr.concat(fArr)
        zArr.sort((i, j) => {
            return i - j
        })
        var leek = k - fArr.length;
        if (zArr[0] == 0) {
            let resNum = 0;
            zArr.forEach(item => {
                resNum += item;
            })
            return resNum
        } else {
            leek = leek % 2;
            if (leek == 0) {
                let resNum = 0;
                zArr.forEach(item => {
                    resNum += item;
                })
                return resNum
            } else {
                zArr[0] = -zArr[0]
                let resNum = 0;
                zArr.forEach(item => {
                    resNum += item;
                })
                return resNum
            }
        }
    }
};
console.log(largestSumAfterKNegations([2, -3, -1, 5, -4], 2))