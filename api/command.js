const path = require('path')
function startServer() {
    const Koa = require('koa');
    const app = new Koa();

    app.use(async ctx => {
        ctx.body = 'Hello World';
    });

    app.listen(3000);
}

module.exports = (req, res) => {
    console.log('收到请求', req)
    startServer()
    const date = new Date().toString();
    res.status(200).send(__dirname);
}

