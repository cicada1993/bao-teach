const path = require('path')
const fs = require('fs')
const { getLocalIP, port } = require('./server/config')
const CopyPlugin = require('copy-webpack-plugin')
function resolveDir(dir) {
    return path.join(__dirname, dir);
}

let copyPatterns = []
let emCdns = []
let files = fs.readdirSync(resolveDir('./ems'))
files = []
// wasm文件和宿主js保持相同目录 new Worker(path) 中的path只能放在根目录 
// 操作的本地文件也只能放在根目录
// 也就是说如果worker.js只能放在根目录 worker.js加载的wasm文件也只能放在根目录
// 或者手动修改其中的路径
files.forEach(
    (name) => {
        emCdns.push({
            js: `./ems/${name}/index.js`
        })
        copyPatterns.push({
            from: `./ems/${name}/index.js`,
            to: `./ems/${name}`
        })
        if (name == 'emcmake') {
            copyPatterns.push({
                from: `./ems/${name}/index.worker.js`,
                to: `./`
            })
            copyPatterns.push({
                from: `./ems/${name}/index.wasm`,
                to: './'
            })
        } else {
            copyPatterns.push({
                from: `./ems/${name}/index.wasm`,
                to: `./ems/${name}`
            })
        }
        if (name == 'fs') {
            copyPatterns.push({
                from: `./ems/${name}/index.data`,
                to: './'
            })
        }
    }
)

let copyPlugin = new CopyPlugin({
    patterns: Array.of(
        {
            from: './ems/emcmake/build/emcmake.js',
            to: './'
        },
        {
            from: './ems/emcmake/build/emcmake.wasm',
            to: './'
        },
        {
            from: process.env.NODE_ENV == "production" ? './node_modules/three/build/three.min.js' : './node_modules/three/build/three.js',
            to: './'
        }
    )
})

let thirdCdns = Array.of(
    {
        js: './emcmake.js'
    },
    {
        js: process.env.NODE_ENV == "production" ? './three.min.js' : './three.js'
    }
)
// 实现不同主题的构建方案
let themeVar = 'light'
module.exports = {
    productionSourceMap: false,

    configureWebpack: (config) => {
        // 修改webpack 配置
        config.resolve.extensions.push('.svelte')
        config.resolve.modules.unshift(resolveDir(`src/favor/${themeVar}`))
        config.plugins.push(copyPlugin)
    },
    pwa: { // pwa配置项
        name: 'test',
        themeColor: '#4c89fe',
        msTileColor: '#4c89fe',
        manifestOptions: {
            start_url: '.',
            background_color: '#4c89fe'
        },
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
        }
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Vue Emscripten Project',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
            cdns: thirdCdns,
            outputDir: 'dist/first'
        },
    },
    transpileDependencies: ['@xdh/my'],
    chainWebpack(config) {
        config.resolve.alias // 别名
            .set('$ui', '@xdh/my/ui/lib')
            .set("@", resolveDir("src"))
        config.module   // svelte
            .rule('svelte')
            .test(/\.svelte$/)
            .use('svelte-loader')
            .loader('svelte-loader')
            .end();
        config.module   // web worker
            .rule('worker')
            .test(/\.worker\.js$/)
            .use('worker-loader')
            .loader('worker-loader')
            .end();
        config.module.rule('js').exclude.add(/\.worker\.js$/); // 
    },
    publicPath: "./",
    devServer: {
        after(app) {

        },
        proxy: {
            "/local": {
                target: `http://${getLocalIP()}:${port}/`,
                changeOrigin: true,
                pathRewrite: {
                    "^/local": "",
                },
            },
            "/amap": {
                target: 'https://geo.datav.aliyun.com/',
                changeOrigin: true,
                pathRewrite: {
                    "^/amap": "",
                },
            },
        }

    }
}