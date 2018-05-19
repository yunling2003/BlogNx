import React, { Component } from 'react'
import { render } from 'react-dom'
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
            <li styleName='listItem' onClick={this.props.onClick}>
                <a styleName='link' href='#'>{this.props.title}</a>
                <div>
                    <p>{this.state.digest}</p>
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
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

export default CSSModules(Article, styles)

