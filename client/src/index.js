import React from 'react'
import { render } from 'react-dom'
import blogStore from './blogStore'
import Root from './components/Root'
import 'antd/dist/antd.less'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'

const initState = {
    currentUser: {
        userName: null,
        isLoggingIn: false,
        logInMessage: null,
        token: null
    },
    articleFilters: {
        page: 0,
        pageSize: 7
    },
    articles: { 
        isFetching: false, 
        didInvalidate: true, 
        totalCount: 0, 
        items: [] 
    },
    myArticles: {
        publish: {
            isPublishing: false,
            status: 'init',
            publishMessage: ''
        },
        isFetching: false,
        didInvalidate: true,
        totalCount: 0,
        items: []
    }
}

const store = blogStore(initState)

render(
    <LocaleProvider locale={zhCN}>
        <Root store={store} />
    </LocaleProvider>,
    document.getElementById('app')
)