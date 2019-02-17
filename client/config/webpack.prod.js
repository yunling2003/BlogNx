const path = require('path')
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
        new CleanWebpackPlugin(['dist'])              
    ],
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'    
    }, 
})