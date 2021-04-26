const mysql = require('mysql2')

const config = require('./config');

// 构建一个线程池

const connections = mysql.createPool({
    host:config.MYSQL_HOST,
    port:config.MYSQL_PORT,
    database:config.MYSQL_DATABASE,
    user:config.MYSQL_USER,
    password:config.MYSQL_PASSWORD,
});

connections.getConnection((err, conn) => {
    conn.connect((err)=> {
        if(err) {
            console.log('fail connection:', err);
        } else {
            console.log('database connected')
        }
    })
});

module.exports = connections.promise();