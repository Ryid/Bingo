const Router = require('koa-router');
const networknum = new Router();
const randomModel = require('../utils/bingoUtil');
const controller = require('../utils/controller');

let netWorkNum = [];
let getnum = new randomModel()
let triigerGame = 0;
let delayTime = 3;
let newtimestamp = '';

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
        newtimestamp += delayTime;

        if (controller.checkWinner()) {
            clearInterval(game);
            let name = controller.getWinnerName();
            netWorkNum = `獲勝者 ${name}!!!`;
            return true;
        }
        if (netWorkNum.length >= 50) return;

        // 產生1~50數字
        let num = getnum.getRandomInt(1, 50);

        // 數字重復就重run
        while (checkArray(num, netWorkNum) && netWorkNum.length < 49) {
            console.log('重設數字');
            num = getnum.getRandomInt(1, 50);
        }
        
        netWorkNum.push(num);
        console.log(netWorkNum);
    }, delayTime * 1000)
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
        newtimestamp = Math.round(new Date().getTime() / 1000) + delayTime;
    }

    // 獲取玩家當前時間
    let timestamp = Math.round(new Date().getTime() / 1000);

    await delayed(ctx, (newtimestamp - timestamp) * 1000);


})

module.exports = networknum;
