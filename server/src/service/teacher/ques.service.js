const connection = require('../../app/database')

class quesService {
  async getList(id, title) {
    const commStatement = `SELECT qid, ques.paperId, type, title, optionAnswer, answer, ques.score, paperName, creator
    FROM questions as ques
    LEFT JOIN paperinfo as paper ON ques.paperId = paper.paperId
    WHERE ques.paperId = ${id}`
    let statement, res
    if (!title) {
      statement = commStatement
      res = await connection.execute(statement)
    } else {
      statement = commStatement + ` AND title LIKE '%${title}%'`
      res = await connection.execute(statement)
    }
    return res[0]
  }

  async update(ques) {

    const { qid, type, title, optionAnswer, answer, score } = ques;
    if (type == 2 || type == 3) {
      const statement = `UPDATE questions SET type = ?, title = ?, optionAnswer = ?, answer = ?, score = ?
        WHERE qid = ? `

      const res = await connection.execute(statement, [type, title, optionAnswer, answer, score, qid])
      return res[0];
    } else if (type == 4) {
      const statement = `UPDATE questions SET type = ?, title = ?, answer = ?, score = ?
        WHERE qid = ?`
      const res = await connection.execute(statement, [type, title, answer, score, qid])
      return res[0];
    } else {
      const statement = `UPDATE questions SET type = ?, title = ?, score = ? WHERE qid = ?`
      const res = await connection.execute(statement, [type, title, score, qid])
      return res[0];
    }
  }

async del(id) {
  const statement = `DELETE FROM questions WHERE qid = ?`
  const res = await connection.execute(statement, [id])
  return res[0]
}
}

module.exports = new quesService