const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/main.ts",
    output: {
        filename: "prod.js",
        path: resolve(__dirname, "dist"),
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.ts$/, // .ts 에 한하여 ts-loader를 이용하여 transpiling
                exclude: /node_module/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                }),
            },
        ],
    },
    resolve: {
        modules: [path.join(__dirname, "src"), "node_modules"], // 모듈 위치
        extensions: [".ts", ".js"],
    },
    devServer: {
        static: {
            directory: resolve(__dirname, ""),
        },
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Hot Module Replacement",
            template: 'index.html'
        }),
    ],
    target: "web",
    mode: "development",
};