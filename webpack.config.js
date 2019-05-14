const config = {
    mode: "development",
    entry: "./main.js",
    output: {
        path: '/',
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port: 5000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        ]
    }
}

module.exports = config