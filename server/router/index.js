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
const checkround = require('./checkround');

router.use('/getUser', getUser.routes(), getUser.allowedMethods());
router.use('/senduser', senduser.routes(), senduser.allowedMethods());
router.use('/check', check.routes(), check.allowedMethods());
router.use('/generatenum', generatenum.routes(), generatenum.allowedMethods());
router.use('/networknum', networknum.routes(), networknum.allowedMethods());
router.use('/playerchoice', playerchoice.routes(), playerchoice.allowedMethods());
router.use('/checkround', checkround.routes(), checkround.allowedMethods());



module.exports = router;