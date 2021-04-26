const connection = require('../../app/database')

class classService {
  async create(classInfo) {
    const { classId, id } = classInfo;
    const statement = `INSERT INTO classes (classId, id) VALUES (?, ?)`
    const res = await connection.execute(statement, [classId, id])
    return res[0];
  }

  async getList() {
    const statement = `SELECT * FROM classes`
    const res = await connection.execute(statement)
    return res[0];
  }

  async getStu(id) {
    const statement = `SELECT * FROM student WHERE classId = ?`
    const res = await connection.execute(statement, [id])
    return res[0];
  }
}

module.exports = new classService()