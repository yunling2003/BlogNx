import React from 'react'
import { render } from 'react-dom'
import blogStore from './blogStore'
import Root from './containers/Root'
import { fakeState } from './reducers/fakeState'
import 'antd/dist/antd.css'

const store = blogStore(fakeState)

render(
    <Root store={store} />,
    document.getElementById('app')
)