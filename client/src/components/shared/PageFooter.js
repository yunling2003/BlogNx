import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './PageFooter.css'

const PageFooter = (state = {}) => (
    <p styleName='extendToBottom'>Copyright ©2019 BlogNx <a href="http://www.beian.miit.gov.cn" target="_blank">沪ICP备19002267号</a></p>
)

export default CSSModules(PageFooter, styles)