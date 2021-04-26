const connection = require('../../app/database')

class paperService {
  // 创建试卷
  async create(exam) {
    const { paperName, paperExplain, time, score, creator, startTime, endTime, creatorName } = exam;
    console.log(paperName)
    // 预处理语句
    const statement = `INSERT INTO paperinfo (
      paperName, paperExplain, time, score, creator, startTime, endTime, creatorName) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`

    const res = await connection.execute(statement, [paperName, paperExplain, time, score, creator, startTime, endTime, creatorName])
    return res[0];
  }

  // 更新试卷

  async update(exam) {
    const { paperId, paperName, paperExplain, time, score, startTime, endTime } = exam;
    console.log(paperName)
    // 预处理语句
    const statement = `UPDATE paperinfo 
    SET paperName = ?, paperExplain = ?, time = ?, score = ?, startTime = ?, endTime = ? WHERE paperId =? `

    const res = await connection.execute(statement, [paperName, paperExplain, time, score, startTime, endTime, paperId])
    return res[0];
  }

  // 删除试卷
  async del(id) {
    const statement = `DELETE FROM paperinfo WHERE paperId = ?`
    const res = await connection.execute(statement, [id])
    return res[0]
  }

  // 查询试卷信息
  async getList(list, name, id) {
    const commStatement = `SELECT * FROM paperInfo WHERE creator = ${id}`
    let statement, res
    if (!list) {
      if (!name) {
        statement = commStatement
        res = await connection.execute(statement)
      } else {
        statement = commStatement + ` AND paperName LIKE '%${name}%'`;
        console.log(statement)
        res = await connection.execute(statement);
        // let searchCategory = (name) => {
        //   let _sql = `${statement} where category like "%${category}%";`
        //   return query(_sql)
        // }
      }
    } else {
      list = list.replace('[', '');
      list = list.replace(']', '')
      if (!name) {
        statement = commStatement + ` WHERE paperId in (${list})`;
        res = await connection.execute(statement)
      } else {
        statement = commStatement + ` WHERE paperId in (${list})  && paperName LIKE '%${name}%'`;
        res = await connection.execute(statement, [list, name])
      }
    }
    return res[0];
  }

  // 创建试题
  async subQues(ques) {
    const { paperId, type, title, optionAnswer, answer, score } = ques;
    if (type == 2 || type == 3) {
      const statement = `INSERT INTO questions (paperId, type, title, optionAnswer, answer, score) VALUES (?, ?, ?, ?, ?, ?);`

      const res = await connection.execute(statement, [paperId, type, title, optionAnswer, answer, score])
      return res[0];
    } else if (type == 4) {
      const statement = `INSERT INTO questions (paperId, type, title, answer, score) VALUES (?, ?, ?, ?, ?);`
      const res = await connection.execute(statement, [paperId, type, title, answer, score])
      return res[0];
    } else {
      const statement = `INSERT INTO questions (paperId, type, title, score) VALUES (?, ?, ?, ?);`
      const res = await connection.execute(statement, [paperId, type, title, score])
      return res[0];
    }
  }

  // 分发试卷到 学生——试卷表
  async connectStu(list, id) {
    const statement = `INSERT INTO student_papers (sno, paperId, status, score) VALUES (?, ?, ?, ?);`
    // console.log(JSON.parse(JSON.stringify(list))[0])
    list.forEach(item => {
      connection.execute(statement, [item, id, 0, 0 ])
    });
    return true
  }
}


module.exports = new paperService()