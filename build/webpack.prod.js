var merge = require("webpack-merge");
const path = require("path")
const webpackBaseConfig = require("./webpack.base");

//压缩丑化代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

//打包时把包内不相关文件清除
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(webpackBaseConfig, {
        output: {
            path: path.join(__dirname,"../dist"),
            filename: "js/[name].js",
            publicPath:"./",
        },
        plugins: [
            //压缩打包代码
            new UglifyJsPlugin({
                //是否生成注释代码文件
                extractComments:false,
                sourceMap:false,
                uglifyOptions:{
                    output:{
                        // 去除注释
                        comments:false
                    }
                }
            }),

            //打包清空文件夹中不重要的
            new CleanWebpackPlugin.CleanWebpackPlugin(),
        ]
    }
)
