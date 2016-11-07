
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        }]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'bundle.js'
    },

    devtool: 'cheap-inline-module-source-map',

    devServer: {
        contentBase: './public',
        hot: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
};