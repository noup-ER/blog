var merge = require("webpack-merge");
var webpack = require("webpack");
const webpackBaseConfig = require("./webpack.base");

//控制控制台输出
// const bundleControl = require("./bundleControl");

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const notifier = require('node-notifier');

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

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

        //查看bundle依赖情况
        new BundleAnalyzerPlugin({
            //  可以是`server`，`static`或`disabled`。
            //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
            //  在“静态”模式下，会生成带有报告的单个HTML文件。
            //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
            analyzerMode: 'server',
            //  将在“服务器”模式下使用的主机启动HTTP服务器。
            analyzerHost: '127.0.0.1',
            //  将在“服务器”模式下使用的端口启动HTTP服务器。
            analyzerPort: 2901,
            //  路径捆绑，将在`static`模式下生成的报告文件。
            //  相对于捆绑输出目录。
            reportFilename: 'report.html',
            //  模块大小默认显示在报告中。
            //  应该是`stat`，`parsed`或者`gzip`中的一个。
            //  有关更多信息，请参见“定义”一节。
            defaultSizes: 'parsed',
            //  在默认浏览器中自动打开报告
            openAnalyzer: false,
            //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
            generateStatsFile: false,
            //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
            //  相对于捆绑输出目录。
            statsFilename: 'stats.json',
            //  stats.toJson（）方法的选项。
            //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
            //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            statsOptions: null,
            logLevel: 'info'
        }),
        // 这可能会对开发模式和发布模式的构建允许不同的行为非常有用。
        // 如果在开发构建中，而不在发布构建中执行日志记录，则可以使用全局常量来决定是否记录日志。
        // 这就是 DefinePlugin 的用处，设置它，就可以忘记开发和发布构建的规则。
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("development")
        })
    ],
    devtool:"source-map",
    watchOptions: {
        ignored: /node_modules/
    },
    //资源大了发出警告
    // performance: {
    //     hints: 'warning'
    // },
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
    stats:"errors-only",

})
