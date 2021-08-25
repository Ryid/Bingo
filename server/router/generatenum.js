const Router = require('koa-router');
const generatenum = new Router();

generatenum.get('/', async (ctx) => {
    let numsOnBoard = [];
    let num = 25;
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function makeBoard(){
        for(i=0;i<num;i++){
            let num =getRandomInt(1,50);
            numsOnBoard.push(num);
        }
    }
    makeBoard();
    ctx.body=numsOnBoard;
})

module.exports = generatenum;