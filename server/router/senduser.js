const Router = require('koa-router');
const senduser = new Router();
const bodyparser = require('koa-bodyparser');
const controller = require('../utils/controller.js');

senduser.use(bodyparser());

let userList=[];

senduser.post('/', async (ctx) => {
    console.log(ctx.request.body);
    let username = ctx.request.body.username;

    console.log(username);

    if (username != '') {
        controller.postUser(username);
    }
})

module.exports = senduser;