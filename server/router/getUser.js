const Router = require('koa-router');
const getUser = new Router();
const bodyparser = require('koa-bodyparser')
const db = require('../utils/db')

getUser.get('/', async (ctx) => {
    let searchSql = `SELECT id,username FROM user WHERE id`;
    let mydata = await new Promise((resolve, reject) => {
        return db.query(searchSql, (err, data) => {
            if (err) throw err;
            resolve(data);
        })
    })
    
    ctx.body = mydata;
})

module.exports = getUser;