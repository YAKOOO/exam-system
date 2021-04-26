const Router = require('koa-router')

const {
  getList,
  update,
  del
} = require('../controller/teacher/ques.controller.js')

const {
  verifyAuth,
} = require('../middleware/teacher/user.middleware');

const quesRouter = new Router({ prefix: '/ques'});


quesRouter.post('/infoList', verifyAuth, getList);
quesRouter.post('/del', verifyAuth, del)
quesRouter.post('/update', verifyAuth, update)

module.exports = quesRouter