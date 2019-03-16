const ReactDOMServer = require("react-dom/server")
const { matchRoutes } = require("react-router-config")
const initState = require('./initialState.js')

class ServerRenderer {
    constructor(serverEntry, template) {
        this.template = template
        this.serverEntry = serverEntry
    }

    renderToString(request) {
        return new Promise((resolve, reject) => {
            const serverEntry = this.serverEntry
            const createApp = serverEntry.createApp
            const createStore = serverEntry.blogStore
            const router = serverEntry.Routes

            const store = createStore(initState)
            
            let context = {}
            let component = createApp(context, request.url, store)
                  
            let matchs = matchRoutes(router, request.path)            
            let promises = matchs.map(({ route, match }) => {
                const asyncData = route.component.asyncData
                return asyncData ? asyncData(store, Object.assign(match.params, request.query)) : Promise.resolve(null)
            })
        
            Promise.all(promises).then(() => {          
                render()
            }).catch(error => {
                reject(error)
            })

            const render = () => {
                let root = ReactDOMServer.renderToString(component)
                if (context.url) {
                    resolve({
                        error: {url: context.url}
                    })
                    return
                }
  
                if (context.statusCode) {
                    resolve({
                        error: {code: context.statusCode}
                    })
                } else {                
                    resolve({
                        error: undefined, 
                        html: this._generateHTML(root, store.getState())
                    })
                }
            }      
        })
  }
  
_generateHTML(root, initialState) {    
    return this.template    
        .replace("<!--react-ssr-head-->", `<script type="text/javascript">window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>`)
        .replace("<!--react-ssr-outlet-->", `<div id="app">${root}</div>`)
    }
}

module.exports = ServerRenderer