import React, {Component}  from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {  requestEditArticle,
    clearArticlePublishStatus } from '../../actions/myblog'
import { Row, Col, Form, Input, Button } from 'antd'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import ArticleEditor from './control/ArticleEditor'
import EditableTag from './control/EditableTag'

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

export class EditArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            title: {
                value: '',
                validateStatus: 'success'
            },
            tags: {
                value: []
            },
            content: {
                value: ''
            },
            editorState: EditorState.createEmpty(),
            init: false            
        }        
    }

    onTagsChange = (tags) => {
        this.setState({
            tags: {
                value: tags
            }
        })
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
        this.props.editArticle({
            id: this.props.article._id,
            title: this.state.title.value,
            tags: this.state.tags.value,
            content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        })
    }       

    componentWillUnmount() {
        this.props.clearPublishStatus()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.publish.status === 'success') {            
            this.props.history.push('/myblog/article/list')            
        }  
    }

    static getEditorState(content) {
        if(content) {
            const contentBlock = htmlToDraft(content)
            if(contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
                return EditorState.createWithContent(contentState)                               
            }
        }
        return EditorState.createEmpty()
    }    

    static getDerivedStateFromProps(nextProps, prevState) {              
        if(nextProps.article && !prevState.init) {
            return {
                title: {
                    value: nextProps.article.title || '',
                    validateStatus: 'success'
                },
                tags: {
                    value: nextProps.article.tags || []
                },
                content: {
                    value: EditArticle.getEditorState(nextProps.article.content).getCurrentContent(),
                    validateStatus: 'success'
                },
                editorState: EditArticle.getEditorState(nextProps.article.content),
                init: true
            }                        
        }
        return null
    }

    render() {        
        const { title, content, tags, editorState } = this.state        
        const { status, publishMessage } = this.props.publish        

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
                            <Form.Item>
                                <EditableTag tags={tags.value} tagsChanged={this.onTagsChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                validateStatus={content.validateStatus}
                                help={content.errorMsg || ''}>
                                <ArticleEditor state={editorState} editorStateChanged={this.onEditorStateChange} />                                
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
                                <p style={{color: 'red'}}>编辑文章失败!{publishMessage}</p>
                            </Col>                        
                        </Row> 
                        : null
                    }
                </div>                
            </Form>                    
        )
    }
}

const getSelectedArticle = (articles, selectedId) => {
    return articles.items.find(a => a._id === selectedId)
}

const mapStateToProps = (state, ownProps) => ({
    publish: state.myArticles.publish,
    article: getSelectedArticle(state.myArticles, ownProps.computedMatch.params.id)
})

const mapDispatchToProps = (dispatch) => ({ 
    editArticle: (article) => dispatch(requestEditArticle(article)),   
    clearPublishStatus: () => dispatch(clearArticlePublishStatus())            
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditArticle))
