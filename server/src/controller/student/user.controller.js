//数据库操作 引用
const service = require('../../service/student/user.service')
class UserController {
    async create(ctx, next) {
        //查询请求参数
        const user = ctx.request.body;
        // 查询数据
        const res = await service.create(user);
        //返回数据
        const { warningStatus } = res
        if (warningStatus == 0) {
            ctx.body =  {
                respCode: 200,
                respMsg: '成功注册~'
            }
        } else {
            ctx.body = {
                respCode: 500,
                respMsg: '注册学生用户失败'
            }
        }
    }

}

module.exports = new UserController