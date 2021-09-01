const Router = require('koa-router');
const senduser = new Router();
const bodyparser = require('koa-bodyparser');
const controller = require('../utils/controller.js');

senduser.use(bodyparser());


senduser.post('/', async (ctx) => {
    console.log(ctx.request.body);
    let username = ctx.request.body.username;
    let model = ctx.request.body.model;

    console.log(username, model);

    if (username != '' && model == 'generate') {
        controller.postUser(username);
        ctx.body = username;
    } else if (username != '' && model == 'playerchoice') {
        controller.postUserPC(username);
        ctx.body = username;
    }
})

module.exports = senduser;