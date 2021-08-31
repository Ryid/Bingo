const Router = require('koa-router');
const playerchoice = new Router();
const randomModel = require('../utils/bingoUtil');
const controller = require('../utils/controller');
const EventEmitter = require('events');
// const { resolve } = require('path');
// const { rejects } = require('assert');

let dispatcher = new EventEmitter();
let netWorkNum = [];
let getnum = new randomModel()
let triigerGame = 0;
let delayTime = 5;

const game = function gameStart() {
    setInterval(function () {
        if (controller.checkWinner()) {
            clearInterval(game);
            let name = controller.getWinnerName();
            netWorkNum = `獲勝者 ${name}!!!`;
            return dispatcher.emit('update');
        }

        if (controller.checkWrite()) {
            netWorkNum.push(controller.getNumber());
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

playerchoice.get('/', async (ctx) => {
    ctx.body = await delayed(ctx);
})


module.exports = playerchoice;