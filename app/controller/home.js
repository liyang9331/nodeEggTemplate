'use strict';
// app/controller/home.js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 控制器
  async index() {
    this.ctx.body = 'Hello world';
  }
}

module.exports = HomeController;
// 框架推荐 Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回：

// 获取用户通过 HTTP 传递过来的请求参数。
// 校验、组装参数。
// 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求。
// 通过 HTTP 将结果响应给用户。
