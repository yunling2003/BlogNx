import React from 'react'
import { render } from 'react-dom'
import blogStore from './blogStore'
import Root from './containers/Root'
import 'antd/dist/antd.less'

const initState = { articles: { isFetching: false, didInvalidate: true, items: [] }}
const store = blogStore(initState)

render(
    <Root store={store} />,
    document.getElementById('app')
)