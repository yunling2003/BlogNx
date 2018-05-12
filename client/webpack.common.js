const webpack = require('webpack')
const path = require('path')
const join = require('path').join
const resolve = require('path').resolve
const existsSync = require('fs').existsSync
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let theme = getTheme();

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        })
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
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'react', 'stage-2'],
                        plugins: [
                            ["import", {
                                "libraryName": "antd",
                                "style": true
                            }]
                        ]
                    }                    
                }
            },
            {
                test: /\.css$/,
                exclude: [/src/],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                })
            },
            {
                test: /\.less$/,
                exclude: [/src/],
                use: ExtractTextPlugin.extract({
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
                    'file-loader'
                ]
            }
        ]
    }
}

function getTheme() {
    let theme = {};
    const pkgPath = join(process.cwd(), 'package.json');    
    const pkg = existsSync(pkgPath) ? require(pkgPath) : {};

    if (pkg.theme && typeof (pkg.theme) === 'string') {
        let cfgPath = pkg.theme;
        // relative path
        if (cfgPath.charAt(0) === '.') {
            cfgPath = resolve(process.cwd(), cfgPath);
        }
        const getThemeConfig = require(cfgPath);
        theme = getThemeConfig();
    }
    else if (pkg.theme && typeof (pkg.theme) === 'object') {
        theme = pkg.theme;
    }
    return theme;
}
