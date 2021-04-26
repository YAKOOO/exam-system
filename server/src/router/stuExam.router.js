const Router = require('koa-router');
// 引用controller

const {
  getAll,
  getPaper,
  getAverage
} = require('../controller/student/paper.controller')

// 拦截器的引入
const {
  verifyAuth,
} = require('../middleware/student/auth.middleware')


const paperRouter = new Router({prefix: '/paper'});

// 获取试卷所有信息
paperRouter.post('/getAll', verifyAuth, getAll)
// 获取试卷平均分
paperRouter.post('/getAverage', verifyAuth, getAverage)

//查询试卷题目

paperRouter.post('/query', verifyAuth, getPaper)


module.exports = paperRouter;