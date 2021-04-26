const Router = require('koa-router');
const {
  create,
  login
} = require('../controller/teacher/user.controller')
const {
  verifyLogin,
  handlePassword
} = require('../middleware/teacher/user.middleware');

const tuserRouter = new Router({prefix: '/teacher'});

tuserRouter.post('/create', handlePassword, create);

tuserRouter.post('/login', verifyLogin, login)

module.exports = tuserRouter;