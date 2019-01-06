const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {   
    devtool: 'source-map',
    mode: 'production',
    optimization:{
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
    },
    plugins: [        
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({           
            'process.env.API_URL': JSON.stringify('http://39.106.198.51/api')
        })        
    ],
    output: {
        filename: '[name].[chunkhash].js',
        publicPath: '/'    
    }, 
})