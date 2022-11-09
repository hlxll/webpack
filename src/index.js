var isInterleave = function (s1, s2, s3) {
  let list1 = s1.split("");
  let list2 = s2.split("");
  let list3 = s3.split("");
  let len1 = list1.length;
  let len2 = list2.length;
  if (len1 + len2 != list3.length) {
    return false;
  }
  let dp = new Array(len1 + 1).fill(0).map(() => {
    return new Array(len2 + 1).fill(false);
  });
  dp[0][0] = true;
  for (let i = 0; i < dp.length; i++) {
    for (let j = 0; j < dp[i].length; j++) {
      if (dp[i][j]) {
        if (j + 1 < dp[i].length) {
          let bottom = list2[j];
          if (bottom == list3[i + j]) {
            dp[i][j + 1] = true;
          }
        }
        if (i + 1 < dp.length) {
          let right = list1[i];
          if (right == list3[i + j]) {
            dp[i + 1][j] = true;
          }
        }
      }
    }
  }
  console.log(dp);
  return dp[len1][len2];
};
let s1 = "aabaac";
let s2 = "aadaaeaaf";
let s3 = "aadaaeaabaafaac";

console.log(isInterleave(s1, s2, s3));
