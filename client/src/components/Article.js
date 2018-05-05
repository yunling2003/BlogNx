import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Article.css'

const Article = ({ onClick, text }) => (
    <li styleName='listItem'
        onClick={onClick}
    >
        {text}
    </li>
)

Article.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}

export default CSSModules(Article, styles)

