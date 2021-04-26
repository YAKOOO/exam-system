const Router = require('koa-router');

const {
  create,
  update,
  del,
  getList,
  subQuestion,
  connectStu
  // getQuestion,
  // submit_paper
} = require('../controller/teacher/exam.controller')


const {
  verifyAuth,
  beforeDel,
  beforeDispatch
} = require('../middleware/teacher/user.middleware')

const examRouter = new Router({ prefix: '/exam'});


// 创建试卷基础信息
examRouter.post('/create', verifyAuth, create)
// 删除试卷基础信息
examRouter.post('/del', verifyAuth, beforeDel, del)
// 更新试卷基础信息
examRouter.post('/update', verifyAuth, update)
// 查询试卷基础信息列表        校验token   允许固定权限
examRouter.post('/infoList', verifyAuth, getList)
// 创建试题
examRouter.post('/subQuestion', subQuestion)
// examRouter.post('/submit_paper', verifyAuth, submit_paper)
// 增加试卷所关联学生
examRouter.post('/connectStu', verifyAuth, connectStu)

module.exports = examRouter;