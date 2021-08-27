const Router = require('koa-router');
const getUser = new Router();
const controller = require('../utils/controller.js')

getUser.get('/', async (ctx) => {
    let userlist = controller.getUser();

    ctx.body = userlist;
})

module.exports = getUser;