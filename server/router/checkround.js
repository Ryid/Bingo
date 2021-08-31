const Router = require('koa-router');
const checkround = new Router();
const randomModel = require('../utils/bingoUtil');
const controller = require('../utils/controller');
const EventEmitter = require('events');


checkround.post('/', async (ctx) => {
    let number = ctx.request.body.number;
    let user = ctx.request.body.username;
    console.log(user, number)

    if (controller.nowGamer == user) {
        controller.setNumber(number);
        controller.nextGamer();
        ctx.body = '傳送成功';
    } else {
        ctx.body = `目前不是你的回合!`
    }

})


module.exports = checkround;