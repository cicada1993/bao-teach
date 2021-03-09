const path = require('path')
function startServer() {
    let nodemon = require('nodemon');

    nodemon({ script: path.join(__dirname, '../server/index.js') }).on('start', function () {
        console.log('nodemon started');
    }).on('crash', function () {
        console.log('script crashed for some reason');
    });
    // force a restart
    nodemon.emit('restart');
}

module.exports = (req, res) => {
    console.log('收到请求', req)
    startServer()
    const date = new Date().toString();
    res.status(200).send(date);
}

