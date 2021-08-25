const Koa = require('koa2');
const app = new Koa();
// 設置端口
const port = 3000;
const router = require('./router')
const cors = require('koa2-cors')
const session = require('koa-session')
// const static = require('koa-static');



app.keys = ['login secret'] // 加密密钥
app.use(session( app));


app.use(cors()); //後端允許跨域
app.use(router.routes(), router.allowedMethods()) //啟用路由;允許任何請求(get、post、put..)




app.listen(port, () => {
    console.log(`伺服器已開啟localhost:${port}`)
})