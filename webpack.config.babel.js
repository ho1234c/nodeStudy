import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export default {
    devtool: (() => { return isProduction ? 'source-map' : 'eval' })(),
    entry: './src/client/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        root: [
            path.resolve('./src/client/node_modules'),
        ]
    },
    module:{
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-loader",
            }
        ],
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: { presets: ['es2015'] }
            },
            {
                test: /\.scss$/,
                loaders: [ 'style', 'css', 'sass' ]
            },
            {
                test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins:(() => {
        const plugins = [];

        if (isProduction) {
            plugins.push(
                new webpack.optimize.UglifyJsPlugin({
                    compressor: {
                        warnings: false
                    }
                })
            );
        }
        plugins.push(new ProgressBarPlugin(), new webpack.OldWatchingPlugin());

        return plugins;
    })()
};