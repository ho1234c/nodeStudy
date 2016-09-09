import webpack from 'webpack'

export default {
    entry: './src/server',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module:{
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-loader"
            }
        ],
        loaders:[
            {
                test: /\.scss$/,
                loaders: [ 'style', 'css', 'sass' ]
            }
        ]
    }
};