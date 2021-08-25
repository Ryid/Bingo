const Router = require('koa-router');
const networknum = new Router();
const randomModel = require('../utils/bingoUtil');

let netWorkNum = [];
let getnum = new randomModel()

function checkArray(number, array) {
    for (var count = 0; count < array.length; count++) {
        if (array[count] == number) {
            return true;
        }
    }
    return false;
}

function delayed(ctx, ms) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            let num = getnum.getRandomInt(1, 50);
            while (checkArray(num, netWorkNum)) {
                // console.log('重設數字');
                num = getnum.getRandomInt(1, 50);
            }
            ctx.body = num;
            netWorkNum.push(num);
            console.log(netWorkNum);
            resolve();
        }, ms)
    })
}

networknum.get('/', async (ctx) => {
    await delayed(ctx, 1000);
})

module.exports = networknum;