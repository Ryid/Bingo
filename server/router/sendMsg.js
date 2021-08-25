const Router = require('koa-router');
const sendMsg = new Router();
const bodyparser = require('koa-bodyparser');
const db = require('../utils/db');

sendMsg.use(bodyparser());

sendMsg.post('/', async (ctx) => {
    let username = ctx.request.body.username;
    let msg = ctx.request.body.msg;
    let timestamp = ctx.request.body.timestamp;
    let purpose = ctx.request.body.purpose;

    console.log(username, msg, timestamp, purpose);

    if (msg != '') {
        let insertSql = `INSERT INTO chat_msg (username,msg,timestamp,purpose) values('${username}',"${msg}","${timestamp}","${purpose}")`
        let result = await new Promise((resolve, reject) => {
            return db.query(insertSql, (err, data) => {
                if (err) throw err;
                console.log(data);
                let obj = {
                    msg: "資料傳送成功"
                }
                resolve(obj)
            })
        })
        ctx.body = result;
    }
})

module.exports = sendMsg;