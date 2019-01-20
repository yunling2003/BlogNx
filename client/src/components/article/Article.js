import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import htmlToText from 'html-to-text'
import { Tag, Tooltip } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './Article.css'

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            digest: ''
        }
    }

    componentDidMount() {
        this.extractDigest(this.props.content)
    }

    render() {
        const { _id, tags, title } = this.props
        return (
            <li styleName='listItem'>
                <Link styleName='link' to={`/article/${_id}`}>{title}</Link>
                <div>
                    <div styleName='text'>
                        {this.state.digest}                        
                    </div>
                    <div>
                        {tags.map((tag, index) => {
                            const isLongTag = tag.length > 10
                            const tagElem = (
                                <Tag key={tag} color="#108ee9" style={{fontSize: '9px', borderRadius: '5px'}} closable={false}>
                                    {isLongTag ? `${tag.slice(0, 10)}...` : tag}                   
                                </Tag>
                            )
                            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem
                        })}
                    </div>
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
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

export default CSSModules(Article, styles)

