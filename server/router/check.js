const Router = require('koa-router');
const check = new Router();
const bodyparser = require('koa-bodyparser')
const db = require('../utils/db')
check.use(bodyparser()) //調用這個中間件取得前端Post的值

check.post('/', async (ctx) => {
    let token = ctx.request.body.token;

    // 判斷資料庫有沒有帳號
    let searchSql = `select id,username,token from user where token='${token}'`
    let myarr = await new Promise((resolve, reject) => {
        return db.query(searchSql, (err, data) => {
            if (err) throw err;
            resolve(data);
        })
    })

    if (token != '') {
        if (myarr[0].token == token) {
            ctx.body = {
                msg: '驗證成功',
                success: true,
                id: myarr[0].id,
                username: myarr[0].username
            }
        } else {
            ctx.body = {
                msg: '驗證失敗，請重新登入',
                success: false
            }
        }
    } else {
        ctx.body = {
            msg: '驗證失敗，請重新登入',
            success: false
        }
    }
})

module.exports = check;