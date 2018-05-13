import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './PageHeader.css'

const PageHeader = (state = {}) => (
    <h1 styleName='head'>Header</h1>
)

export default CSSModules(PageHeader, styles)