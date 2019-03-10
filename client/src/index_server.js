import React from "react"
import { StaticRouter } from "react-router-dom"
import { Provider } from "react-redux"
import blogStore from './blogStore'
import 'antd/dist/antd.less'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'
import Root from './components/Root'
import Routes from './components/Routes'

const createApp = (context, url, store) => {
    const App = () => {
        return (
            <LocaleProvider locale={zhCN}>
                <Provider store={store}>
                    <StaticRouter context={context} location={url}>
                        <Root />  
                    </StaticRouter>
                </Provider>
            </LocaleProvider>
        )
    }
    return <App />
}

export {
    createApp,
    blogStore,
    Routes
}