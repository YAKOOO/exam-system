const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../../app/config');

class AuthController {
  async login(ctx, next) {
    const { sno, name, classId} = ctx.user;
    // 颁发token 签名
    const token = jwt.sign({sno, name}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      //过期时间
      algorithm: 'RS256'
    })
    ctx.body = {
      respCode: 1,
      studentInfo: [{
        name: name,
        sno: sno,
        classId: classId
      }],
      resMsg: `登录成功，欢迎${name}回来~`,
      token: token
    }
  }
  
  //授权
  async success(ctx, next) {
    ctx.body = {
      respCode: 1,
      resMessage: `成功授权`,
    }
  }

  async changePwd(ctx, next) {
    ctx.body = {
      respCode: 1,
      resMessage: `密码修改成功`,
    }
  }
}

module.exports = new AuthController;