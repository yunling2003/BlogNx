import React from 'react'
import ReactDOM from 'react-dom'
import blogStore from './blogStore'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './components/Root'
import 'antd/dist/antd.less'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'

const initState = window.__INITIAL_STATE__

initState.currentUser = sessionStorage.getItem("currentUser") ? 
                JSON.parse(sessionStorage.getItem("currentUser"))
                : initState.currentUser,
initState.articleFilters = sessionStorage.getItem("articleFilters") ?
                JSON.parse(sessionStorage.getItem("articleFilters"))
                : initState.articleFilters,
initState.articles = sessionStorage.getItem("articles") ?
                JSON.parse(sessionStorage.getItem("articles"))
                : initState.articles,
initState.myArticles = sessionStorage.getItem("myArticles") ?
                JSON.parse(sessionStorage.getItem("myArticles"))
                : initState.myArticles

const createApp = (Component) => {        
    const store = blogStore(initState)
    const App = () => {
      return (
        <LocaleProvider locale={zhCN}>
            <Provider store={store}>
                <Router>
                    <Component />
                </Router>
            </Provider>
        </LocaleProvider>
      )
    }
    return <App />
  }

ReactDOM.hydrate(
    createApp(Root),
    document.getElementById('app')
)

if (module.hot) {
    module.hot.accept("./components/Root", () => {
        const NewApp = require("./components/Root").default
        ReactDOM.hydrate(createApp(NewApp), document.getElementById("app"))
    })
}