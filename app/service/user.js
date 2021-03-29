const Service = require('egg').Service;

class UserService extends Service {
  async login(account,password) {
    const res = await this.app.mysql.select('user_info',{
        where:{account: account,password:password},
        columns: ['id','account', 'nikename']
    })
    return res
  }
  async getAll(){
    const res = await this.app.mysql.select('user_info')
    return res
  }
}
module.exports = UserService;