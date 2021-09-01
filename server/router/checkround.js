const Router = require('koa-router');
const checkround = new Router();
const bodyparser = require('koa-bodyparser');
const randomModel = require('../utils/bingoUtil');
const controller = require('../utils/controller');

checkround.use(bodyparser());

checkround.post('/', async (ctx) => {
    let number = ctx.request.body.number;
    let user = ctx.request.body.username;
    // console.log(user, number)

    if (controller.nowGamer() == user && !controller.checkWinnerPC()) {
        controller.setNumber(number);
        controller.nextGamer();
        controller.setWrite();
        ctx.body = '傳送成功';
    } else {
        ctx.body = `目前不是你的回合!`
    }
})


module.exports = checkround;