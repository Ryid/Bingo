// 引入路由
const Router = require('koa-router');
const router = new Router();
const db = require('../utils/db')

const getChatMsg = require('./getChatMsg')
const getUser = require('./getUser')
const sendMsg = require('./sendMsg')
const check = require('./check');
const generatenum=require('./generatenum');
const networknum=require('./networknum');

router.use('/getChatMsg', getChatMsg.routes(), getChatMsg.allowedMethods());
router.use('/getUser', getUser.routes(), getUser.allowedMethods());
router.use('/sendMsg', sendMsg.routes(), sendMsg.allowedMethods());
router.use('/check', check.routes(), check.allowedMethods());
router.use('/generatenum',generatenum.routes(),generatenum.allowedMethods());
router.use('/networknum',networknum.routes(),networknum.allowedMethods());

// // 取得DB數據
// router.get('/', async (ctx) => {
//     let mydata = await new Promise((resolve, reject) => {
//         return db.query(`select * from user`, (err, data) => {
//             if (err) throw err;
//             resolve(data);
//         })
//     })
//     ctx.body = mydata;
// })


module.exports = router;