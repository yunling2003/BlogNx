import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './Article.css'

class Article extends Component {    

    render() {
        return (
            <li styleName='listItem'>
                <Link styleName='link' to={`/myblog/article/edit/${this.props._id}`}>{this.props.title}</Link>
                &nbsp;&nbsp;<Button size='small' type='primary' icon='delete' shape='circle' />
            </li>
        )
    }
}

Article.propTypes = {    
    _id: PropTypes.string.isRequired,    
    title: PropTypes.string.isRequired               
}

export default CSSModules(Article, styles)