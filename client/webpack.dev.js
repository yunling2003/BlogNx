const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {   
    devtool: 'cheap-module-source-map', 
    mode: 'development',
    devServer: {
        contentBase: ['./dist', './assets'],
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin({ 
            openAnalyzer: false 
        }),
        new webpack.DefinePlugin({            
            'process.env.API_URL': JSON.stringify('http://localhost:3000/api')
        })
    ]
})