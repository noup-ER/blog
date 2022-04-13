const path = require("path");
const rootpath = path.resolve(__dirname,"../");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    target: "node",
    mode:"production",
    entry: path.resolve(rootpath,"express/blog.js"),
    output: {
        path: path.resolve(rootpath,"blog_dist"),
        filename: "blog.js"
    },
    module:{
        rules: [
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
    optimization: {
        minimize: true
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}