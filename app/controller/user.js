'use strict';
// app/controller/home.js
const Controller = require('egg').Controller;
class UserController extends Controller {
    // this包含 
    // ctx Context 是一个请求级别的对象
    // app Application 是全局应用对象，在一个应用中，只会实例化一个，它继承自 Koa.Application，在它上面我们可以挂载一些全局的方法和对象。
    // config 应用的配置
    // service 应用所有的 service
    // 注册-控制器
    async register() {
        const { ctx, service } = this;
        const createRule = {
            account: { type: 'string' },
            password: { type: 'string' },
        };
        // 校验参数
        ctx.validate(createRule);
        // 组装参数
        // 调用 Service 进行业务处理
        const res = await service.user.register(ctx.request.body);
        // 设置响应内容和响应状态码
        if (res.status) {
            ctx.body = {
                status: 200,
                data: res.data,
                msg: res.msg
            }
            ctx.status = 200;
        } else {
            ctx.body = {
                status: 201,
                data: res.data,
                msg: res.msg
            }
            ctx.status = 201;
        }
    }
    // 登录-控制器
    async login() {
        const { ctx, service, app } = this;
        const createRule = {
            account: { type: 'string' },
            password: { type: 'string' },
        };
        // 校验参数
        ctx.validate(createRule);
        // 组装参数
        // 调用 Service 进行业务处理
        const res = await service.user.login(ctx.request.body);
        // 设置响应内容和响应状态码
        if (res.status) {
            //生成 token 的方式
            const token = app.jwt.sign({
                username: res.account, //需要存储的 token 数据
            }, app.config.jwt.secret);
            ctx.body = {
                status: 200,
                data: res.data,
                msg: res.msg,
                token: token
            }
            ctx.status = 200;
        } else {
            ctx.body = {
                status: 201,
                data: res.data,
                msg: res.msg
            }
            ctx.status = 201;
        }
    }
    // 获取全部数据-控制器
    async getAll() {
        const { ctx,service } = this
        // 调用 Service 进行业务处理
        const res = await service.user.getAll();
        // 设置响应内容和响应状态码
        if (res.status) {
            ctx.body = {
                status: 200,
                data: res.data,
                msg: res.msg
            }
            ctx.status = 200;
        } else {
            ctx.body = {
                status: 201,
                data: res.data,
                msg: res.msg
            }
            ctx.status = 201;
        }
    }
}
module.exports = UserController;
// 框架推荐 Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回：
// 获取用户通过 HTTP 传递过来的请求参数。
// 校验、组装参数。
// 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求。
// 通过 HTTP 将结果响应给用户。