const Router = require('koa-router');
const generatenum = new Router();

const randomModel = require('../utils/bingoUtil');

generatenum.get('/', async (ctx) => {
    let numsOnBoard = [];
    let num = 25;
    let getnum = new randomModel();
    // function getRandomInt(min, max) {
    //     return Math.floor(Math.random() * (max - min)) + min;
    // }

    function checkArray(number, array) {
        // console.log("Checking array for" + number);
        for (var count = 0; count < array.length; count++) {
            if (array[count] == number) {
                return true;
            }
        }
        return false;
    }
    // console.log

    function makeBoard() {
        for (i = 0; i < num; i++) {
            // let num = getRandomInt(1, 50);

            let num = getnum.getRandomInt(1, 50);
            while (checkArray(num, numsOnBoard)) {
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