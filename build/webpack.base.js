const path = require("path")
//加入vueloader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//webpack打包时生成一个html容纳js
const HTMLPlugin = require('html-webpack-plugin')

// 将css文件分开打包
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpack = require('webpack');

const postcss = require("./postcss.config")

const config={
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
        publicPath: "/"
    },
    //loaders
    module: {
        rules: [
            {
                test:/\.css$/,
                use:[process.env.NODE_ENV === 'production'?MiniCssExtractPlugin.loader:"style-loader",'css-loader',postcss]
            },
            {
                test:/\.scss$/,
                use:[process.env.NODE_ENV === 'production'?MiniCssExtractPlugin.loader:"style-loader",'css-loader',postcss,'sass-loader', {
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
            //处理图片及字体
            {
                test: /\.(png|jpe?g|gif|svg|ttf|woff)$/,
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
                        ],
                        "plugins": [
                            [
                                "component",
                                {
                                    "libraryName": "element-ui",
                                    "styleLibraryName": "theme-chalk"
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
        new MiniCssExtractPlugin({
            // 使用filename配置可以指定输出的css的文件名和文件位置
            filename: "css/[name]_[hash:6].css"
        }),

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
            template:'./public/index.html',
            minify:{
                removeRedundantAttributes:true, // 删除多余的属性
                collapseWhitespace:true, // 折叠空白区域
                removeAttributeQuotes: true, // 移除属性的引号
                removeComments: true, // 移除注释
                collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
            },
            favicon: "./public/book.svg"
        })
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
