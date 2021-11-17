const path = require('path')

process.libName = 'mzzs'

module.exports = {
    pages: {
        index: {
            entry: 'examples/main.ts',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    // 审查 webpack 配置： vue inspect > output.js
    chainWebpack: config => {
        config.resolve.alias
            .set('@', path.resolve(__dirname, 'packages'))
            .set('@types', path.resolve(__dirname, 'types'))
    }
}
