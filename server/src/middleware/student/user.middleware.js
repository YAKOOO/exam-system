const errorTypes = require('../../constants/error-types');
const service = require('../../service/student/user.service');
const md5password = require('../../utils/password-handle');



const verifyUser = async (ctx, next) =>  {
    // 获取用户名 密码
    const { sno, password, name, classId } = ctx.request.body;
//判断是否为空
    if(!sno || !password || !name || !classId) {
        const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx);
    }
// 判断名称是否被注册过
    const res = await service.getUserByUsername(sno);
    if(res.length) {
        const error = new Error(errorTypes.REPEAT);
        return ctx.app.emit('error', error, ctx);
    }
    await next()
}

const handlePassword = async (ctx, next) => {
    const { password } =  ctx.request.body;
    ctx.request.body.password = md5password(password);

    await next();
}



module.exports = {
    verifyUser,
    handlePassword
}