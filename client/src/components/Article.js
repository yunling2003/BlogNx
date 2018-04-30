import React from 'react'
import PropTypes from 'prop-types'

const Article = ({ onClick, text }) => (
    <li
        onClick={onClick}
    >
        {text}
    </li>
)

Article.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}

export default Article

