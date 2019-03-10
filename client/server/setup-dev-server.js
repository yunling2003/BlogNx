const path = require("path")
const webpack = require("webpack")
const MFS = require('memory-fs')
const clientConfig = require("../config/webpack.dev")
const serverConfig = require("../config/webpack.ssr")

module.exports = function setupDevServer(app, callback) {
    let serverEntry
    let template
    let resolve
    const readyPromise = new Promise(r => { resolve = r })
    const update = () => {
        if (serverEntry && template) {            
            callback(serverEntry, template)
            resolve()            
        }
    }

    const readFile = (fs, fileName) => {        
        return fs.readFileSync(path.join(clientConfig.output.path, fileName), "utf-8")
    }

    clientConfig.entry.app = ["webpack-hot-middleware/client", clientConfig.entry.app]
    clientConfig.output.filename = "[name].bundle.js"
    
    const clientCompiler = webpack(clientConfig)

    const devMiddleware = require("webpack-dev-middleware")(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true
    })

    app.use(devMiddleware)

    clientCompiler.plugin("done", stats => {
        const info = stats.toJson()
        if (stats.hasWarnings()) {
            console.warn(info.warnings)
        }
    
        if (stats.hasErrors()) {
            console.error(info.errors)
            return
        }
        
        template = readFile(devMiddleware.fileSystem, "index.html")
        update()
    })

    app.use(require("webpack-hot-middleware")(clientCompiler))

    const serverCompiler = webpack(serverConfig)
    const mfs = new MFS()
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {       
        const info = stats.toJson()
        if (stats.hasWarnings()) {
            console.warn(info.warnings)
        }

        if (stats.hasErrors()) {
            console.error(info.errors)
            return
        }
        
        const bundle = readFile(mfs, "index_server.js")                                
        const m = new module.constructor()
        m._compile(bundle, "index_server.js")
        serverEntry = m.exports            
        update()
    })

    return readyPromise
}