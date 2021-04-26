const fs = require('fs');
const path = require('path');
// 统一管理端口号 和 数据库配置信息
const dotenv = require('dotenv');
dotenv.config();

// 实现token的 私钥 公钥
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));


console.log(process.env.APP_PORT)
module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
} = process.env;


module.exports.PRIVATE_KEY  = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;