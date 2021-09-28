import './index.css'; // import $ from 'jquery';

import './iconfont.css'; // import动态导入语法：能将某个文件单独打包
// 懒加载：不会加载文件，执行时候才会加载运行
// 预加载：打包好就会加载文件（等其他文件加载完成再加载），但是不会执行，到执行该功能时候，会引入之前加载文件，执行功能
// console.log($);

console.log('js功能');

if (module.hot) {
  // 一旦module.hot为true，说明开启了HMR功能
  console.log('打开HMR功能')();
} // 注册servicewokrer
// 处理兼容
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(() => {
//       console.log('注册成功');
//     }).catch(() => {
//       console.log('注册失败');
//     });
//   });
// }
