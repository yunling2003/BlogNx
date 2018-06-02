import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './SidePanel.css'

const SidePanel = (state = {}) => (
    <h1 styleName='panel'>Panel</h1>
)

export default CSSModules(SidePanel, styles)