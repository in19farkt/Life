
const NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: [
                "react-hot-loader/webpack",
                "babel-loader"
            ],
        }, {
            test: /\.css$/,
            loader: 'style!css' //!autoprefixer?browsers=last 2 versions'
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('css!stylus?resolve url') //!autoprefixer?browsers=last 2 versions'
        }, {
            test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            loader: 'file?name=[path][name].[ext]'
        }]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    output: {
        path: __dirname + '/public',
        publicPath: './',
        filename: 'bundle.js'
    },

    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

    devServer: {
        contentBase: './public',
        hot: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new HtmlWebpackPlugin({filename: 'index.html', template: './src/index.html'}),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
};