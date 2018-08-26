const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'production',
    plugins: [
        new UglifyJSPlugin({            
            sourceMap: true
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.API_URL': JSON.stringify('http://localhost:3000')
        })
    ],
    output: {
        filename: '[name].[chunkhash].js',
        publicPath: './'    
    }, 
})