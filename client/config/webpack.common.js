const path = require('path')
const join = require('path').join
const resolve = require('path').resolve
const existsSync = require('fs').existsSync
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const extractAppCSS = new ExtractTextPlugin('style.css')
const extractVendorCSS = new ExtractTextPlugin('vendor.css')

let theme = getTheme()

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './assets/images/favicon.ico'
        }),
        extractAppCSS,
        extractVendorCSS        
    ],
    optimization: {
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
        }
    },    
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.js$/,
                include: path.resolve(__dirname, '../src'),
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '../src'),
                use: {
                    loader: 'babel-loader'                                      
                }
            },
            {
                test: /\.css$/,
                exclude: [/src/],
                use: extractVendorCSS.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.css$/,
                include: [/src/],
                use: extractAppCSS.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                })
            },
            {
                test: /\.less$/,
                exclude: [/src/],
                use: extractVendorCSS.extract({
                    use: [{
                        loader: 'css-loader?sourceMap'
                    }, {
                        loader: 'less-loader', options: {
                            sourceMap: true,
                            javascriptEnabled: true,                                             
                            modifyVars: theme
                        }
                    }]                        
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {                            
                            name: './assets/images/[name].[ext]?[hash]'                                                   
                        }
                    }                    
                ]
            }
        ]
    },
    node: {
        fs: 'empty'
    }    
}

function getTheme() {    
    let theme = {}
    const pkgPath = join(process.cwd(), 'package.json')    
    const pkg = existsSync(pkgPath) ? require(pkgPath) : {}

    if (pkg.theme && typeof (pkg.theme) === 'string') {
        let cfgPath = pkg.theme
        // relative path        
        if (cfgPath.charAt(0) === '.') {
            cfgPath = resolve(process.cwd(), cfgPath)
        }
        const getThemeConfig = require(cfgPath)
        theme = getThemeConfig()        
    }
    else if (pkg.theme && typeof (pkg.theme) === 'object') {
        theme = pkg.theme
    }
    return theme
}
