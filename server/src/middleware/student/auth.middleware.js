const jwt = require('jsonwebtoken')

const errorTypes = require('../../constants/error-types');
const service = require('../../service/student/user.service')
// 密码加密
const md5password = require('../../utils/password-handle')
const { PUBLIC_KEY } = require('../../app/config')

const verifyLogin = async (ctx, next) => {
  console.log('user login verify');
  // 获取用户名 密码
  const { sno, password } = ctx.request.body;
  // 判断用户名是否为空
  // 判断是否为空
  if (!sno || !password) {
    const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx);
  }
  // 判断名称是否存在当前账号
  const res = await service.getUserByUsername(sno);
  const user = res[0];
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断密码是否相同（进行加密
  if (md5password(password) !== user.password) {

    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx);
  }

  ctx.user = user;
  await next()
}

// 验证授权
const verifyAuth = async (ctx, next) => {
  console.log("verifyAuth's middleware");
  // get token
  const authorization = ctx.headers.authorization;
  // 情节处于 没有token 没有登录直接进行接口请求
  console.log(authorization);
  if(!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);

  }
  const token = authorization.replace('Bearer ', '');
  // verify token
  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    ctx.user = res;
    await next();
  } catch (err){
    console.log(err)
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }
}

const verifyPwd = async (ctx, next) => {
  console.log("verify password");
  const { sno } = ctx.user;
  const {oldPwd, newPwd} = ctx.request.body;
  const res = await service.getUserByUsername(sno);
  const user = res[0];
  if ( md5password(oldPwd) != user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx);
  } else {
    await service.changePwd(sno, md5password(newPwd))
    await next()  
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPwd
};