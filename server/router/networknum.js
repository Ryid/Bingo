const Router = require('koa-router');
const networknum = new Router();
const randomModel = require('../utils/bingoUtil');
const controller = require('../utils/controller');

let netWorkNum = [];
let getnum = new randomModel()
let triigerGame = 0;

// 重復的數字重新篩選
function checkArray(number, array) {
    for (var count = 0; count < array.length; count++) {
        if (array[count] == number) {
            return true;
        }
    }
    return false;
}

// 每10秒產生數字
const game = function gameStart() {
    setInterval(function () {
        if (controller.checkWinner()) {
            clearInterval(game);
            let name = controller.getWinnerName();
            netWorkNum = `獲勝者 ${name}!!!`;
            return true;
        }
        if (netWorkNum.length >= 50) return;
        let num = getnum.getRandomInt(1, 50);
        while (checkArray(num, netWorkNum) && netWorkNum.length < 49) {
            console.log('重設數字');
            num = getnum.getRandomInt(1, 50);
        }
        netWorkNum.push(num);
        console.log(netWorkNum);
    }, 5000)
}

// 過X秒後給client陣列
function delayed(ctx, ms) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            ctx.body = netWorkNum;
            console.log(netWorkNum);
            resolve();
        }, ms)
    })
}


networknum.get('/', async (ctx) => {
    // 在觸發api後開始每10秒發送隨機數字
    if (triigerGame == 0) {
        game();
        triigerGame += 1;
    }
    await delayed(ctx, 5000);
    // let rel=await Promise.race([game(),delayed(ctx,5000)])
    // let rel=await Promise.race([game,delayed])
    // ctx.body=rel;

})

module.exports = networknum;
