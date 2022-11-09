/**
 * 服务器代码
*/
// const express = require('express');
// const app = express();
// app.use(express.static('dist', {maxAge: 1000*3600}));
// app.listen(3000)

var splitListToParts = function(head, k) {
    let newArr = []
    let len = head.length;
    let lenChu = Math.floor(len/k);
    let duoyu = len - lenChu*k;
    for(let i=0;i<k;i++) {
        if(i<duoyu){
            let arr = head.slice(0, lenChu+1) || [];
            head.splice(0, lenChu+1);
            newArr.push(arr)
        }else{
            let arr = head.slice(0, lenChu) || [];
            head.splice(0, lenChu);
            newArr.push(arr)
        }
    }
    return newArr;
};
console.log(splitListToParts([1,2,3], 5))
