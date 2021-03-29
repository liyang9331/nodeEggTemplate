'use strict';
// app/controller/home.js
const Controller = require('egg').Controller;

class UserController extends Controller {
    // 控制器
    async login() {
        const { ctx, service, app } = this;
        const createRule = {
            account: { type: 'string' },
            password: { type: 'password' },
        };
        // 校验参数
        ctx.validate(createRule);
        // 组装参数
        // const author = ctx.session.userId;
        let account = ctx.request.body.account
        let password = ctx.request.body.password
        // 调用 Service 进行业务处理
        const res = await service.user.login(account, password);
        // 设置响应内容和响应状态码
        // ctx.body = { id: res.id };
        // ctx.status = 201;
        // this.ctx.body = '这是user下的登陆接口';
        //生成 token 的方式
        const token = app.jwt.sign({
            username: account, //需要存储的 token 数据
        }, app.config.jwt.secret);
        const array = {
            'data': res,
            'token': token
        }
        ctx.body = array;
    }
    async getAll() {
        const { ctx, service } = this;
        // 调用 Service 进行业务处理
        const res = await service.user.getAll();
        ctx.body = res
    }
}

module.exports = UserController;
// 框架推荐 Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回：

// 获取用户通过 HTTP 传递过来的请求参数。
// 校验、组装参数。
// 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求。
// 通过 HTTP 将结果响应给用户。