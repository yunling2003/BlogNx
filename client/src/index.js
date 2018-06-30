import React from 'react'
import { render } from 'react-dom'
import blogStore from './blogStore'
import Root from './containers/Root'
import 'antd/dist/antd.less'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'

const initState = {
    articleFilters: {
        page: 0,
        pageSize: 7
    },
    articles: { 
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