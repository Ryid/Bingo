// 引入路由
const Router = require('koa-router');
const router = new Router();
const db = require('../utils/db')

const getUser = require('./getUser')
const senduser = require('./senduser')
const check = require('./check');
const generatenum = require('./generatenum');
const networknum = require('./networknum');
const playerchoice = require('./playerchoice');

router.use('/getUser', getUser.routes(), getUser.allowedMethods());
router.use('/senduser', senduser.routes(), senduser.allowedMethods());
router.use('/check', check.routes(), check.allowedMethods());
router.use('/generatenum', generatenum.routes(), generatenum.allowedMethods());
router.use('/networknum', networknum.routes(), networknum.allowedMethods());
router.use('/playerchoice', playerchoice.routes(), playerchoice.allowedMethods());

const EventEmitter = require('events');
// const { resolve } = require('path');

var dispatcher = new EventEmitter();
var num = 0;


function delayed(ctx) {
    return new Promise((resolve, reject) => {
        dispatcher.once('update', function () {
            // ctx.body =num;
            resolve(num);
        });
    })
}



module.exports = router;