const path = require('path');
// const merge = require('webpack-merge');
const { merge } = require('webpack-merge');

const { resolve } = require('path');

// 引入通用webpack配置文件
const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: './src/main.ts',
    module: {
        rules:
            [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
                    
                },
            ]
    },

    resolve: {
        // ...
    
        fallback: {
          "assert": require.resolve("assert/")
        },
      },
    // 使用 source-map
    devtool: 'source-map',
    // 对 webpack-dev-server 进行配置
    devServer: {
        contentBase: './dist',
        // host:'0.0.0.0',
        host:'localhost',
        // 设置localhost端口
        port: 9000,
        // 自动打开浏览器
        open: true,
    },
    plugins: [
    ],
    // 设置出口文件地址与文件名
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.min.js'
    }
});


