var merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base");

//控制控制台输出
// const bundleControl = require("./bundleControl");

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const notifier = require('node-notifier');

//定义端口
const port = 4089;

module.exports = merge(webpackBaseConfig,{
    mode:"development",
    plugins:[
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You application is running here http://localhost:${port}`],
                // notes: ['Some additionnal notes to be displayed unpon successful compilation']
            },
            onErrors: (severity, errors) => {
                if (severity !== 'error') {
                    return;
                }
                const error = errors[0];
                notifier.notify({
                    title: "Webpack error",
                    message: severity + ': ' + error.name,
                    subtitle: error.file || ''
                });
            },
            clearConsole:true
        }),
    ],
    devServer:{
        // 启动的服务端口
        port,
        // 通过localhost或IP进行访问
        host: '0.0.0.0',
        //热加载
        hot: true,
        proxy:{
            '/dataAccess':{
                target:'http://127.0.0.1:3038',
                changeOrigin:true,
                pathRewrite:{
                    '^/dataAccess':''
                }
            }
        }
    },
    stats:"errors-only"
})
