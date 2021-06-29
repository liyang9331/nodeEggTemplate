const Service = require('egg').Service;
const utility = require("utility")//密码加密
class UserService extends Service {
  // 用户注册服务
  async register(data) {
    const { ctx, app } = this;
    // 查询是否已经注册
    const res = await app.mysql.get('user', { account: data.account })
    if (res) {
      return {
        status: false,
        msg: '账号已经被注册',
        data: ''
      }
    } else {
      // 生成随机密码盐
      const salt = Math.random().toString(15).substr(2)
      let md5 = utility.md5(data.password + '' + salt);
      // 在 user 表中，插入 用户注册数据
      const result = await app.mysql.insert('user', { account: data.account, password: md5, salt: salt });
      if (result.affectedRows === 1) {
        // 插入成功
        const results = await app.mysql.get('user', { account: account });
        return {
          status: true,
          msg: '成功',
          data: {
            id: results.id,
            account: result.account,
            nike_name: result.nike_name,
            email: result.email,
            phone: result.phone
          }
        }
      } else {
        // 插入失败
        return {
          status: false,
          msg: '注册失败',
          data: ''
        }
      }
    }

  }
  // 用户登录服务
  async login(data) {
    const { app } = this;
    // 查询账号是否存在
    const result = await app.mysql.get('user', { account: data.account });
    if (result == '') {
      return {
        status: false,
        msg: '账号不存在',
        data: ''
      }
    }
    // md5加密密码和盐,比对数据库中的密码
    if (utility.md5(data.password + '' + result.salt) === result.password) {
      return {
        status: true,
        msg: '成功',
        data: {
          id: result.id,
          account: result.account,
          nike_name: result.nike_name,
          email: result.email,
          phone: result.phone
        }
      }
    } else {
      return {
        status: false,
        msg: '密码错误',
        data: ''
      }
    }
  }
  async getAll(){
    const {app} = this
    const result =await app.mysql.select('user');
    if(result){
      return {
        status: true,
        msg: '成功',
        data: result
      }
    }else{
      return {
        status: false,
        msg: '失败',
        data: ''
      }
    }
  }

}
module.exports = UserService;