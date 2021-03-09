const KoaRouter = require('@koa/router')
const path = require('path')
const fs = require('fs')
const router = new KoaRouter()

function resolveDir(dir) {
    return path.join(__dirname, dir)
}

function getProjs() {
    return new Promise((resolve, reject) => {
        fs.readdir(resolveDir('../ems'), (err, files) => {
            console.log('文件列表', files)
            resolve(files)
        })
    })
}

router.get('/ems/folders', async (ctx, next) => {
    // 获取ems目录下文件列表
    const files = await getProjs()
    ctx.body = files
})
module.exports = router