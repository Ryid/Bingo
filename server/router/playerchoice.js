const Router = require('koa-router');
const playerchoice = new Router();
const controller = require('../utils/controller');
const EventEmitter = require('events');
const bodyparser = require('koa-bodyparser');

playerchoice.use(bodyparser());

let dispatcher = new EventEmitter();
let netWorkNum = [];
let triigerGame = 0;
let delayTime = 1;
dispatcher.setMaxListeners(100)


const game = function gameStart() {
    setInterval(function () {
        if (controller.checkWinnerPC()) {
            clearInterval(game);
            let name = controller.getWinnerNamePC();
            netWorkNum = `獲勝者 ${name}!!!`;
            return dispatcher.emit('update');
        }

        if (controller.checkWrite()) {
            console.log(controller.getNumber());
            netWorkNum.push(controller.getNumber());
            controller.setPcArray(controller.getNumber());
            controller.setWrite();
            dispatcher.emit('update');
        }
    }, delayTime * 1000)
}

function delayed() {
    return new Promise((resolve, rejects) => {
        dispatcher.once('update', function () {
            resolve({
                array: netWorkNum,
                status: 'Update'
            });
        })
    })
}

// 時間到沒新資料執行
function timeout() {
    return new Promise((resolve, reject) => {
        timer = setTimeout(() => {
            resolve({
                array: netWorkNum,
                status: 'TimeOut'
            });
        }, 10000)
    });
}

playerchoice.post('/', async (ctx) => {
    let clientArray = ctx.request.body.clientArr;

    if (triigerGame == 0) {
        game();
        triigerGame += 1;
    }

    // 驗證client跟Server資料不同步的話，更新client資料
    if (JSON.stringify(netWorkNum) != JSON.stringify(clientArray)) {
        return ctx.body = {
            array: netWorkNum,
            status: '資料不同步進行更新'
        }
    }

    // clearTimeout(timer);
    ctx.body = await Promise.race([delayed(), timeout()]);
})


module.exports = playerchoice;