const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {   
    devtool: 'source-map',
    mode: 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/'    
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            favicon: path.resolve(__dirname, '../assets/images/favicon.ico')
        }),
        new webpack.DefinePlugin({
            'process.env.SERVER_ENV': JSON.stringify('remote')
        })
    ],
    optimization:{
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: -20,
                    chunks: 'initial'
                }
            }
        },
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
                uglifyOptions: {                    
                    compress: {
                        inline: 1,
                        keep_fnames: true
                    },
                    mangle: {
                        keep_fnames: true
                    }
                }
            })
        ]
    }    
})