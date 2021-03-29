'use strict';
// app/router.js
module.exports = app => {
  const { router, controller, jwt } = app;
  // 路由     '/' 控制器
  router.get('/', controller.home.index);
  router.post('/login', controller.user.login);
  router.get('/user_info', jwt, controller.user.getAll);
  // token 添加到请求头中
  //   headers:{
  // 切记 token 不要直接发送，要在前面加上 Bearer 字符串和一个空格
  //   'Authorization':`Bearer ${token}`
  // }
  /* 
* 这里的第二个对象不再是控制器，而是 jwt 验证对象，第三个地方才是控制器
* 只有在需要验证 token 的路由才需要第二个 是 jwt 否则第二个对象为控制器
**/
};