module.exports = {
    loader: 'postcss-loader',
    options: {
        postcssOptions:{
            plugins: [
                require("postcss-preset-env")({
                    "browsers": [
                        "defaults",
                        "not ie < 8",
                        "last 2 versions",
                        "> 1%",
                        "iOS 10",
                        "last 3 iOS versions"
                    ]
                })
            ]
        }
    }
}