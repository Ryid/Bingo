const Router = require('koa-router');
const playerchoice = new Router();
const randomModel = require('../utils/bingoUtil');
const controller = require('../utils/controller');
const EventEmitter = require('events');


let dispatcher = new EventEmitter();
let netWorkNum = [];
let getnum = new randomModel()
let triigerGame = 0;
let delayTime = 1;
let timer = null;


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
            controller.setWrite();
            dispatcher.emit('update');
        }
    }, delayTime * 1000)
}

function delayed(ctx) {
    return new Promise((resolve, rejects) => {
        dispatcher.once('update', function () {
            resolve(netWorkNum);
        })
    })
}

function timeout() {
    return new Promise((resolve, reject) => {
        timer = setTimeout(() => {
            console.log('timeout')
            resolve(netWorkNum);
        }, 10000)
    });
}

playerchoice.get('/', async (ctx) => {
    if (triigerGame == 0) {
        game();
        triigerGame += 1;
    }

    clearTimeout(timer);
    ctx.body = await Promise.race([delayed(), timeout()]);
})


module.exports = playerchoice;