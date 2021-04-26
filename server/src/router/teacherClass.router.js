const Router = require('koa-router');

const {
  // 创建班级
  create,
  getStu,
  getList
} = require('../controller/teacher/class.controller')

const {
  verifyAuth
} = require('../middleware/teacher/user.middleware')

const classRouter = new Router({prefix: '/class'});

classRouter.post('/create', verifyAuth, create )
classRouter.post('/getList', verifyAuth, getList)
// 根据id名获取 student
classRouter.post('/getStudent', verifyAuth, getStu)

module.exports = classRouter