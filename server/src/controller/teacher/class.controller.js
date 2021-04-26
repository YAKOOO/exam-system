const service = require('../../service/teacher/class.service')

class ClassController {
  // 创建班级表
  async create(ctx, next) {
    const classInfo = ctx.request.body;
    const res = await service.create(classInfo)
    const { warningStatus } = res
    if (warningStatus == 0) {
      ctx.body = {
        respCode: 200,
        respMsg: '创建班级成功~'
      }
    } else {
      ctx.body = {
        respCode: 500,
        respMsg: '创建班级失败'
      }
    }
  }

  async getList(ctx, next) {
    const res = await service.getList()
    ctx.body = {
      respCode: 200,
      respMsg: '查询成功',
      list: res
    }
  }

  async getStu(ctx, next) {
    const { classId } = ctx.request.body;
    const res = await service.getStu(classId)
    ctx.body = {
      respCode: 200,
      respMsg: '查询成功',
      list: res
    }
  }
}

module.exports = new ClassController