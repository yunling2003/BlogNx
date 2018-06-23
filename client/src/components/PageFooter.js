import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './PageFooter.css'

const PageFooter = (state = {}) => (
    <p styleName='extendToBottom'>Copyright ©2018 BlogNx</p>
)

export default CSSModules(PageFooter, styles)