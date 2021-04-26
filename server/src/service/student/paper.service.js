
const connection = require('../../app/database');

class PaperService {
  async getAll (sno) {
    const statement = `SELECT s_p.sno, s_p.paperId, s_p.status,s_p.score,p.paperExplain,
      p.startTime, p.endTime, p.paperName, p.time
      FROM student_papers as s_p LEFT JOIN paperinfo as p ON s_p.paperId = p.paperId
      WHERE sno = ?`
    const res = await connection.execute(statement, [sno])
    return res[0]
  }
  async query(id) {
    const statement = `
    SELECT
	    p.paperId, p.paperName, p.paperExplain, p.startTime, p.endTime, p.time,
	    JSON_ARRAYAGG(JSON_OBJECT(
	    'qid', q.qid, 
	    'title', q.title,
	    'option', q.optionAnswer,
      'type', q.type,
      'score', q.score
	    )) as questions
      FROM paperinfo as p
      LEFT JOIN questions as q ON p.paperId = q.paperId
      WHERE p.paperId = ?
      GROUP BY p.paperId;
    `
    const res = await connection.execute(statement, [id]);
    return res[0]
  }

  async getAverage(list) {
    let statement
    let listStatement
    if(!list) {
      statement = `SELECT * FROM student_papers WHERE status = 1 `
      const res = await connection.execute(statement)
      return res[0]
    } else {
      statement = `SELECT * FROM student_papers WHERE `
      list.forEach((item, index) => {
        if (index === 0) {
          listStatement = ` paperId = ${item} && status = 1`
        } else {
          listStatement += ` || paperId = ${item} && status = 1`
        }
      });
      const total = statement + listStatement
      const res = await connection.execute(total)
      return res[0]
    }
  }
}

module.exports = new PaperService()