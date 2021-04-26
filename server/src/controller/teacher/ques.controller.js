const service = require('../../service/teacher/ques.service')

class quesController {
  // 获取试卷列表
  async getList(ctx, next) {
    const { paperId, title } = ctx.request.body;
    const res = await service.getList(paperId, title)
    ctx.body = {
      respCode: 200,
      respMsg: '查询成功',
      list: res
    }
  }

  async update(ctx, next) {
    const ques = ctx.request.body
    const res = await service.update(ques);
    const { warningStatus } = res

    if (warningStatus == 0) {
      ctx.body = {
        respCode: 200,
        respMsg: '更新试卷成功~'
      }
    } else {
      ctx.body = {
        respCode: 500,
        respMsg: '更新试卷失败'
      }
    }
  }

  async del(ctx, next) {
    const { qid } = ctx.request.body
    const res = await service.del(qid);
    const { warningStatus } = res

    if (warningStatus == 0) {
      ctx.body = {
        respCode: 200,
        respMsg: '删除试卷成功~'
      }
    } else {
      ctx.body = {
        respCode: 500,
        respMsg: '删除试卷失败'
      }
    }
  }
}

module.exports = new quesController