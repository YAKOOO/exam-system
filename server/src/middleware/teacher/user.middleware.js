const jwt = require('jsonwebtoken')
const errorTypes = require('../../constants/error-types');
const userService = require('../../service/teacher/user.service')
const quesService = require('../../service/teacher/ques.service')
// 密码加密
const md5password = require('../../utils/password-handle')
const { PUBLIC_KEY } = require('../../app/config')

const verifyLogin = async (ctx, next) => {
  console.log('user login verify');
  // 获取用户名 密码
  const { id, password } = ctx.request.body;
  // 判断用户名是否为空
  // 判断是否为空
  if (!id || !password) {
    const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx);
  }
  // 判断名称是否存在当前账号
  const res = await userService.getUser(id);
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

// 判断是否已有id && 判断所提交数据是否有空
const verifyUser = async (ctx, next) =>  {
  // 获取用户名 密码
  const { id, password, name } = ctx.request.body;
//判断是否为空
  if(!sno || !password || !name) {
      const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED)
      return ctx.app.emit('error', error, ctx);
  }
// 判断名称是否被注册过
  const res = await userService.getUser(id);
  if(res.length) {
      const error = new Error(errorTypes.REPEAT);
      return ctx.app.emit('error', error, ctx);
  }
  await next()
}
// 对提交的pwd进行加密
const handlePassword = async (ctx, next) => {
  console.log(ctx.request.body)
  const { password } =  ctx.request.body;
  ctx.request.body.password = md5password(password);

  await next();
}

const beforeDel = async (ctx, next) => {
  const { paperId } = ctx.request.body;
  const res = await quesService.getQues(paperId);
  if(res.length) {
    error = new Error(errorTypes.DELETE_ERROR)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}



module.exports = {
  verifyLogin,
  verifyAuth,
  verifyUser,
  beforeDel,
  handlePassword
};