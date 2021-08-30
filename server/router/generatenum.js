const Router = require('koa-router');
const generatenum = new Router();

const randomModel = require('../utils/bingoUtil');

let getnum = new randomModel();
let num = 25;

generatenum.get('/', async (ctx) => {
    let numsOnBoard = [];
    
    function makeBoard() {
        for (i = 0; i < num; i++) {
            let num = getnum.getRandomInt(1, 50);
            while (getnum.checkArray(num, numsOnBoard)) {
                console.log('重設數字');
                num = getnum.getRandomInt(1, 50);
            }
            numsOnBoard.push(num);
        }
    }
    makeBoard();
    ctx.body = numsOnBoard;
})

module.exports = generatenum;