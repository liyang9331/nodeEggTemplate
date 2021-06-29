'use strict';
// app/router.js
module.exports = app => {
  const { router, controller, jwt } = app;
  // 路由映射到控制器
  router.post('/register', controller.user.register)
  router.post('/login', controller.user.login);
  /* 
* 这里的第二个对象不再是控制器，而是 jwt 验证对象，第三个地方才是控制器
* 只有在需要验证 token 的路由才需要第二个 是 jwt 否则第二个对象为控制器
**/
/* headers:{
      // 切记 token 不要直接发送，要在前面加上 Bearer 字符串和一个空格
      'Authorization':`Bearer ${token}`
    }
*/
// jwt 鉴权
  router.get('/getall',jwt,controller.user.getAll)
};