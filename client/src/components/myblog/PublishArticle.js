import React, {Component}  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { requestPublishArticle, clearArticlePublishStatus } from '../../actions/myblog'
import * as API from '../../api'
import { Row, Col, Form, Input, Button } from 'antd'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

function validateField(value, message) {
    if(value) {
        return {
            validateStatus: 'success',
            errorMsg: null
        }
    }
    return {
        validateStatus: 'error',
        errorMsg: message
    }
}

function validateContent(contentState, message) {
    if(contentState.hasText()) {
        return {
            validateStatus: 'success',
            errorMsg: null
        }
    }
    return {
        validateStatus: 'error',
        errorMsg: message
    }
}

export class PublishArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: {
                value: ''
            },
            content: {
                value: ''
            },
            editorState: EditorState.createEmpty()
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
            content: {
                ...validateContent(editorState.getCurrentContent(), '请输入文章内容!'),
                value: editorState.getCurrentContent()
            }
        })
    }

    hasErrors = () => {
        return this.state.title.validateStatus !== 'success' || this.state.content.validateStatus !== 'success'
    }

    handleTitleChange = (e) => {
        const value = e.target.value
        this.setState({
            title: {
                ...validateField(value, '请输入文章标题!'),
                value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.publishArticle({
            title: this.state.title.value,
            content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        })
    }

    uploadImageCallBack = (file) => {
        return new Promise(
          (resolve, reject) => {
            let imgObj = new FormData()
            imgObj.append('file', file, file.name)                        
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            }
            API.uploadImage(imgObj, config)
                .then(res=>{                    
                    resolve(res.data)
                }) 
          }
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.articles.publish.status === 'success') {            
            this.props.history.push('/myblog/article/list')
        }
    }

    componentWillUnmount() {
        this.props.clearPublishStatus()
    }

    render() {
        const { title, content, editorState } = this.state        
        const { publish } = this.props.articles
        const { status, publishMessage } = publish

        return (            
            <Form onSubmit={this.handleSubmit}>
                <div>
                    <Row>
                        <Col span={20}>
                            <Form.Item                                                                                                                                                           
                                validateStatus={title.validateStatus}
                                help={title.errorMsg || ''}>
                                <Input value={title.value}
                                    placeholder='输入标题'
                                    onChange={this.handleTitleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                validateStatus={content.validateStatus}
                                help={content.errorMsg || ''}>
                                <Editor editorState={editorState}
                                        editorStyle={{ height: '400px', border: '1px solid #F1F1F1', lineHeight: '1em' }}
                                        localization={{ locale: 'zh' }}
                                        placeholder='输入正文'
                                        toolbar={{     
                                            fontFamily: {
                                                options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 
                                                    'Verdana', 'SimSun', 'SimHei', 'FangSong', 'KaiTi', 'Microsoft YaHei', 
                                                    'STXihei', 'STHeiti', 'STKaiti', 'STSong', 'STFangsong'],                                                
                                            },                                                                                  
                                            image: { 
                                                uploadCallback: this.uploadImageCallBack, 
                                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg', 
                                                alt: { present: true, mandatory: true } 
                                            },
                                        }}
                                        onEditorStateChange={this.onEditorStateChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item>                                
                                <Button type="primary" 
                                    htmlType="submit"
                                    disabled={this.hasErrors()} >保存</Button>                                
                            </Form.Item> 
                        </Col>
                    </Row>
                    {status === 'fail' ? 
                        <Row>
                            <Col span={24}>
                                <p style={{color: 'red'}}>发布文章失败!{publishMessage}</p>
                            </Col>                        
                        </Row> 
                        : null
                    }
                </div>                
            </Form>                    
        )
    }
}

PublishArticle.propTypes = {
    articles: PropTypes.shape({
        publish: PropTypes.shape({
            status: PropTypes.string.isRequired,       
            publishMessage: PropTypes.string.isRequired
        }).isRequired        
    }).isRequired
}

function mapStateToProps(state) {
    return {
        articles: state.myArticles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        publishArticle: (article) => dispatch(requestPublishArticle(article)),
        clearPublishStatus: () => dispatch(clearArticlePublishStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PublishArticle))