const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {    
    mode: 'production',
    entry: {
        app: path.resolve(__dirname, '../src/index_server.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index_server.js',
        libraryTarget: 'commonjs2',
        publicPath: '/dist/'      
    },
    target: 'node',    
    context: __dirname,
    node: {
        __filename: false,
        __dirname: false
    },    
    plugins: [        
        new webpack.DefinePlugin({
            'process.env.REACT_ENV': JSON.stringify('server')
        })           
    ]    
})