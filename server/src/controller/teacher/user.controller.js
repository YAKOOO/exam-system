const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../../app/config');

//数据库操作 引用
const service = require('../../service/teacher/user.service')
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
                respMsg: '成功注册~',
                teacherInfo: {
                    name: user.name,
                    id: user.id
                }
            }
        } else {
            ctx.body = {
                respCode: 500,
                respMsg: '注册教师用户失败'
            }
        }
    }

    async login(ctx, next) {
        const { id, name } = ctx.user;
        console.log(name)
        const token = jwt.sign({ id, name }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        })
        ctx.body = {
            respCode: 1,
            respMsg: '教师端登录成功~',
            token: token,
            teacherInfo: {
                id: id,
                name: name
            }
        }
        
    }

}

module.exports = new UserController