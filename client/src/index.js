import React from 'react'
import { render } from 'react-dom'
import blogStore from './blogStore'
import Root from './containers/Root'
import 'antd/dist/antd.less'

const initState = {
    articleFilters: {
        page: 0
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
    <Root store={store} />,
    document.getElementById('app')
)