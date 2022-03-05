const path = require("path")
//加入vueloader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')


//webpack打包时生成一个html容纳js
const HTMLPlugin = require('html-webpack-plugin')

const webpack = require('webpack')

//判断是否是开发者环境
const isDev = process.env.NODE_ENV === 'development';


const config={
    mode:"development",
    //在全局加入编译目标：web平台（网站，跑在浏览器中）
    target: 'web',
    // 入口文件
    entry: {
        path:path.join(__dirname,"../src/main.js")
    },
    // 打包输出文件
    output: {
        path: path.join(__dirname,"../dist"),
        filename: "js/[name].js",
    },
    //loaders
    module: {
        rules: [
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader', {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [path.resolve(__dirname,"../src/assets/scss/blog-common.scss")]
                    }
                }]
            },
            {
                test:/\.vue$/,
                use:['vue-loader']
            },
            //处理图片
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use:[{
                    loader: 'url-loader',
                    options:{
                        name:'[hash:10].[ext]',
                        //关闭es模块，webpack会把src变成require(),需要commonjs模块
                        esModule: false,
                    }
                }]
            },
            // 处理多媒体文件
            {
                // test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                test: /\.(mp4)$/,
                loader: 'url-loader',
                options: {
                    name:'[hash:10].[ext]',
                    //关闭es模块，webpack会把src变成require(),需要commonjs模块
                    esModule: false,
                },
            },
            // babel
            {
                test: /\.js$/,
                exclude: /node_modules/, // 忽略node_modules和bower_components目录下的js的文件
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env" /*
                    Presets是储存JavaScript不同标准的插件，
                    通过使用正确的presets，告诉babel按照哪个presets编译JS。(相对于babel的插件)
                    常见presets： @babel/preset-env(官方提供默认的presets)、@babel/preset-stage、@babel/preset-react、@babel/preset-typescript */,
                                {
                                    targets: {
                                        // 根据 webpack 打包后运行环境目标(target)的自定义配置
                                        browsers: [">1%"],
                                    }
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    //插件
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options:{
                quite:true
            }
        }),
        //加载vue时用到的插件
        new VueLoaderPlugin(),

        //生成html入口文件
        new HTMLPlugin({
            title: "林兆隆的博客",
            template:'./public/index.html'
        }),

        // 这可能会对开发模式和发布模式的构建允许不同的行为非常有用。
        // 如果在开发构建中，而不在发布构建中执行日志记录，则可以使用全局常量来决定是否记录日志。
        // 这就是 DefinePlugin 的用处，设置它，就可以忘记开发和发布构建的规则。
        new webpack.DefinePlugin({
            'process.env': {
                // 判断是否isDev，若是，则为development；若不是，则为production
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
    ],
    // 路径设置
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@':path.join(__dirname,"../src")
        },
        //导入时检测别名
        extensions: ['*', '.js', '.vue']
    }
}




module.exports = config;
