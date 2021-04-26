const Router = require('koa-router');
// 引用 controller
const {
    create,
} = require('../controller/student/user.controller')

// 拦截器的引入
const {
    verifyUser,
    handlePassword,
} = require('../middleware/student/user.middleware')


const userRouter = new Router({prefix: '/user'});

// 拦截中间件
userRouter.post('/register', verifyUser, handlePassword, create)


module.exports = userRouter;