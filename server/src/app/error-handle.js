const errorTypes = require('../constants/error-types')

const errorHandler = (err, ctx) => {
  let status, message;
  switch (err.message) {
    case errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      respMsg = "用户名或者密码不能为空"
      break;

    case errorTypes.ERROR_REQUEST:
      status = 415;
      respMsg = "请求参数错误"
      break;

    case errorTypes.REPEAT:
      status = 409;
      respMsg = '用户名不得重复'
      break;

    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400;
      respMsg = '用户名不存在'
      break;

    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400;
      respMsg = '密码错误'
      break;

    case errorTypes.UNAUTHORIZATION:
      status = 401;
      respMsg = '用户未授权'
      break;

    case errorTypes.DELETE_ERROR:
      status = 400;
      respMsg = '无法删除有试题的试卷'
      break;
      
    default:
      status = 404;
      respMsg = "NOT FOUND"
  }
  ctx.status = status;
  ctx.body = {
    respCode: status,
    respMsg: respMsg
  };
}

module.exports = errorHandler;