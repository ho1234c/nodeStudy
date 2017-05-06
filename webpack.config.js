const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/client/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-loader",
                enforce: "pre"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
        ]
    },
    devtool: "sourc-map",
    plugins: [
        new ProgressBarPlugin(),
        new UglifyJSPlugin({
            compressor: {
                warnings: false
            },
            mangle: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: module => module.context && module.context.indexOf("node_modules") !== -1
        })
    ]
}