import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'antd'
import CSSModules from 'react-css-modules'
import { deleteArticle } from '../../actions/myblog'
import styles from './Article.css'

const confirm = Modal.confirm

export class Article extends Component {    
    constructor(props) {
        super(props)
    }

    showDeleteConfirm = (e) => {
        let inst = this
        confirm({
          title: '删除文章',
          content: '确定删除这篇文章吗?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
             inst.props.deleteArticle(inst.props._id)
          }
        })
    }

    render() {
        return (
            <li styleName='listItem'>
                <Link styleName='link' to={`/myblog/article/edit/${this.props._id}`}>{this.props.title}</Link>
                &nbsp;&nbsp;<Button onClick={this.showDeleteConfirm.bind(this)} size='small' type='primary' icon='delete' shape='circle' />
            </li>
        )
    }
}

Article.propTypes = {    
    _id: PropTypes.string.isRequired,    
    title: PropTypes.string.isRequired               
}

const mapDispatchToProps = (dispatch) => ({
    deleteArticle: (id) => dispatch(deleteArticle(id))
})

export default connect(null, mapDispatchToProps)(CSSModules(Article, styles))