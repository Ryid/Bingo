const Router = require('koa-router');
const checkround = new Router();
const bodyparser = require('koa-bodyparser');
const randomModel = require('../utils/bingoUtil');
const controller = require('../utils/controller');

checkround.use(bodyparser());
let random = new randomModel();

checkround.post('/', async (ctx) => {
    let number = ctx.request.body.number;
    let user = ctx.request.body.username;
    // console.log(typeof number);

    if (typeof number != 'number' || random.checkArray(number, controller.pcArray()) || number > 50) {
        return ctx.body = `請輸入1~50數字或是數字已重復!`
    }
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