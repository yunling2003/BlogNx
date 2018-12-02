import React from 'react'
import { render } from 'react-dom'
import blogStore from './blogStore'
import Root from './components/Root'
import 'antd/dist/antd.less'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'

const currentUserDefault = {
    userName: null,
    isLoggingIn: false,
    logInMessage: null,
    token: null
}

const articleFiltersDefault = {
    page: 0,
    pageSize: 7
}

const articlesDefault = { 
    isFetching: false, 
    didInvalidate: true, 
    totalCount: 0, 
    items: [] 
}

const myArticlesDefault = {
    publish: {
        isPublishing: false,
        status: 'init',
        publishMessage: ''
    },
    selectedMenu: 'article_list',
    isFetching: false,
    isDeleting: false,
    didInvalidate: true,
    totalCount: 0,
    items: []
}

const initState = {
    currentUser: sessionStorage.getItem("currentUser") ? 
                JSON.parse(sessionStorage.getItem("currentUser"))
                : currentUserDefault,
    articleFilters: sessionStorage.getItem("articleFilters") ?
                JSON.parse(sessionStorage.getItem("articleFilters"))
                : articleFiltersDefault,
    articles: sessionStorage.getItem("articles") ?
                JSON.parse(sessionStorage.getItem("articles"))
                : articlesDefault,
    myArticles: sessionStorage.getItem("myArticles") ?
                JSON.parse(sessionStorage.getItem("myArticles"))
                : myArticlesDefault
}

const store = blogStore(initState)

render(
    <LocaleProvider locale={zhCN}>
        <Root store={store} />
    </LocaleProvider>,
    document.getElementById('app')
)