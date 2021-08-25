const Router = require('koa-router');
const getChatMsg = new Router();
const bodyparser = require('koa-bodyparser')
const db = require('../utils/db')
getChatMsg.use(bodyparser());

getChatMsg.post('/', async (ctx) => {
    let username = ctx.request.body.user;
    let purpose = ctx.request.body.purpose
    // console.log(username,purpose) //顯示傳來的值
    
    // 判斷資料庫有沒有帳號
    let searchSql = '';
    if (purpose == 'group' || purpose == '') {
        searchSql = `SELECT * FROM chat_msg WHERE purpose='${purpose}'`;
    } else {
        searchSql = `SELECT * FROM chat_msg WHERE username='${username}'and purpose='${purpose}' OR username='${purpose}' and purpose='${username}'`
    }

    let mydata = await new Promise((resolve, reject) => {
        return db.query(searchSql, (err, data) => {
            if (err) throw err;
            resolve(data);
        })
    })
    ctx.body = mydata;
})


module.exports = getChatMsg;