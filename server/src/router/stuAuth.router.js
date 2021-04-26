const Router = require('koa-router');

const {
  login,
  success,
  changePwd
} = require('../controller/student/auth.controller.js');

const {
  verifyLogin,
  verifyAuth,
  verifyPwd
} = require('../middleware/student/auth.middleware')
const authRouter = new Router({prefix: '/user'});


authRouter.post('/login', verifyLogin, login );
authRouter.post('/change_password', verifyAuth, verifyPwd, changePwd)
// 验证授权接口
authRouter.get('/test', verifyAuth, success);

module.exports = authRouter;