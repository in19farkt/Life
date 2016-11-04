
const webpack = require('webpack');

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
    devServer: {
        contentBase: './public',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};