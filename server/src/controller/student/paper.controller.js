//数据库
const service = require('../../service/student/paper.service')

class PaperController {
  async getAll(ctx, next) {
    try {
      const { sno } = ctx.user
      const res = await service.getAll(sno);
      ctx.body = {
        respCode: 200,
        respMsg: '查询成功',
        list: res
      }
    } catch (e) {
      ctx.body = {
        respCode: e.code || -1,
        respMsg: e.message
      };
    }
  }
  async getPaper(ctx, next) {
    try {
      const {paperId} = ctx.request.body;

      const res = await service.query(paperId);
      ctx.body = {
        respCode: 200,
        respMsg: '获取试卷成功',
        list: res
      }
    } catch(e) {
      ctx.body = {
        respCode: e.code || -1,
        respMsg: e.message
      };
    }

  }

  async getAverage(ctx, next) {
    try {
      const averObj = {}
      const { paperId } = ctx.request.body
      const res = await service.getAverage(paperId)
      // 创建 key - value 
      res.forEach(item => {
        averObj[item.paperId] = []
      })
      res.forEach(item => {
        averObj[item.paperId].push(item.score)
      })

      ctx.body = {
        respCode: 200,
        respMsg:'查询成功',
        list: averObj
      }
    } catch(e) {

    }
  }
}

module.exports = new PaperController