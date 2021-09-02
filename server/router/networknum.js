const Router = require('koa-router');
const networknum = new Router();
const randomModel = require('../utils/bingoUtil');
const controller = require('../utils/controller');
const EventEmitter = require('events');

let dispatcher = new EventEmitter();
let netWorkNum = [];
let triigerGame = 0;
let delayTime = 5;
let num=0;
let bingoNum=[];
let bingoArray=[];

// 產生1~50陣列
function pushArray(){
	for(let i=1;i<=50;i++){
  	bingoNum.push(i);
  }
}

// 陣列洗牌
function shuffle(arr) {
    let i, j, temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};


// 每10秒放入數字
const game = function gameStart() {
    setInterval(function () {
        if (controller.checkWinner()) {
            clearInterval(game);
            let name = controller.getWinnerName();
            netWorkNum = `獲勝者 ${name}!!!`;
            return dispatcher.emit('update');
        }

        if(netWorkNum.length > 49) return;

        netWorkNum.push(bingoArray[num]);
        console.log(netWorkNum);
        num++;
        
        // 通知所有客戶端資料有更新
        dispatcher.emit('update');
    }, delayTime * 1000)
}

// 過X秒後給client陣列
function delayed() {
    return new Promise((resolve, reject) => {
        dispatcher.once('update', function () {
            resolve({
                array: netWorkNum,
                status: 'Update'
            });
        });
    })
}

// 時間到沒新資料執行
function timeout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                array: netWorkNum,
                status: 'TimeOut'
            });
        }, 3000)
    });
}

networknum.get('/', async (ctx) => {
    // let timer = null;
    // 在觸發api後開始每10秒發送隨機數字
    if (triigerGame == 0) {
        pushArray();
        bingoArray=shuffle(bingoNum);
        game();
        triigerGame += 1;
    }

    // clearTimeout(timer);
    ctx.body = await Promise.race([delayed(), timeout()]);

})

module.exports = networknum;

