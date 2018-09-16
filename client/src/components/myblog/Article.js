import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './Article.css'

class Article extends Component {    

    render() {
        return (
            <li styleName='listItem'>
                <Link styleName='link' to={`/myblog/article/${this.props.id}`}>{this.props.title}</Link>
            </li>
        )
    }
}

export default CSSModules(Article, styles)