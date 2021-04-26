const connection = require('../../app/database');

class UserService {
  async getUser(id) {
    const statement = `SELECT id, password, name FROM teacher WHERE id = ?;`;
    const res = await connection.execute(statement, [id]);
    return res[0];
  }

  async create(user) {
    const { id, name, password } = user;
    const statement = `INSERT INTO teacher (id, name, password) VALUES (?, ?, ?);`;
    const res = await connection.execute(statement, [id, name, password]);
    return res[0]
  }
}

module.exports = new UserService()