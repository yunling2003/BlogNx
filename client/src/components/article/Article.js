import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import htmlToText from 'html-to-text'
import CSSModules from 'react-css-modules'
import styles from './Article.css'

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {digest: ''}
    }

    componentDidMount() {
        this.extractDigest(this.props.content)
    }

    render() {
        return (
            <li styleName='listItem'>
                <Link styleName='link' to={`/article/${this.props.id}`}>{this.props.title}</Link>
                <div>
                    <p styleName='text'>{this.state.digest}</p>
                </div>        
            </li>
        )
    }

    extractDigest(content) {
        let text = htmlToText.fromString(content, {
            wordwrap: false,
            ignoreImage: true
        })        
        this.setState({ digest: this.getTextFromJson(text) })        
    }
    
    getTextFromJson(text) {        
        return text.length > 100 ? text.substr(0, 100) + '...' : text        
    }
}

Article.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

export default CSSModules(Article, styles)
