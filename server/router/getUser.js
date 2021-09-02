const Router = require('koa-router');
const getUser = new Router();
const controller = require('../utils/controller.js')
const bodyparser = require('koa-bodyparser');

getUser.use(bodyparser());

getUser.post('/', async (ctx) => {
    // console.log(ctx.request.body);
    let model = ctx.request.body.model;
    let userlist = []
    if (model == 'generate') {
        userlist = controller.getUser();
    } else if (model == 'playerchoice') {
        userlist = controller.getUserPC()
    } else {
        userlist = [];
    }


    ctx.body = userlist;
})

module.exports = getUser;