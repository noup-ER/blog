var merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack")
const webpackBaseConfig = require("./webpack.base");

//压缩丑化代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

//打包时把包内不相关文件清除
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = merge(webpackBaseConfig, {
    output: {
        path: path.join(__dirname,"../dist"),
        filename: "js/[hash].js",
        publicPath:"./"
    },
    plugins: [
        //打包清空文件夹中不重要的
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("production")
        })
    ],

    optimization:{
        //启用代码压缩 mode是production默认开启
        minimize:true,
        minimizer:[
            new UglifyJsPlugin({
                //是否生成注释代码文件
                extractComments:false,
                sourceMap:false,
                uglifyOptions:{
                    output:{
                        // 去除注释
                        comments:false
                    },
                    compress:{
                        warnings:false,
                        drop_debugger:true,
                        drop_console:true
                    }
                },
            }),
        ],

        splitChunks: {
            // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
            chunks: "all",
            // 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
            minSize: 30000,
            // 表示一个模块至少应被minChunk   s个chunk所包含才能分割。默认为1。
            minChunks: 1,
            // 表示按需加载文件时，并行请求的最大数目。默认为5。
            maxAsyncRequests: 5,
            // 表示加载入口文件时，并行请求的最大数目。默认为3。
            maxInitialRequests: 3,
            // 表示拆分出的chunk的名称连接符。默认为~。如chunk~vendors.js
            automaticNameDelimiter: '~',
            // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
            name: true,
            // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块，就分配到该组。模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。默认将所有来自 node_modules目录的模块打包至vendors组，将两个以上的chunk所共享的模块打包至default组。
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                //
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
})
