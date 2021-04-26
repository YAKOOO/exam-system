// 连接数据库的一些操作

const connection = require('../../app/database');

class UserService {
    async create(user) {
        //将user 存储到数据库中
        const {sno, name, password, classId} = user;
        const statement = `INSERT INTO student (sno, name, password, classId) VALUES (?,?,?,?);`;
        // id 递加
        // const nowId = 'SELECT  LAST_INSERT_ID()'
        // const queryId = `SELECT MAX(instId) FROM user`
        const res = await connection.execute(statement, [sno, name, password, classId])
        return res[0];
    }

    async getUserByUsername(sno) {
        const statement = `SELECT * FROM student WHERE sno = ?;`;
        const res = await connection.execute(statement, [sno]);
        return res[0];
    }

    async changePwd(sno, newPwd) {
        const statement = `UPDATE student SET password = ? WHERE sno = ?;`
        const res = await connection.execute(statement, [newPwd, sno]);
        return res[0];
    }
}

module.exports = new UserService()