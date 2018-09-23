import React, {Component}  from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Input, Button } from 'antd'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

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

export class PublishArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: {
                value: '',
            },
            editorState: EditorState.createEmpty()
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    hasErrors = () => {
        return this.state.title.validateStatus !== 'success'
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

    }

    uploadImageCallBack = (file) => {
        return new Promise(
          (resolve, reject) => {
             resolve(true)
          }
        )
    }

    render() {
        const { title, editorState } = this.state        

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
                                <Editor editorState={editorState}
                                        editorStyle={{ height: '400px', border: '1px solid #F1F1F1', lineHeight: '1em' }}
                                        placeholder='输入正文'
                                        toolbar={{     
                                            fontFamily: {
                                                options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 
                                                    'Verdana', 'SimSun', 'SimHei', 'FangSong', 'KaiTi', 'Microsoft YaHei', 
                                                    'STXihei', 'STHeiti', 'STKaiti', 'STSong', 'STFangsong'],                                                
                                            },                                       
                                            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
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
                </div>                
            </Form>                    
        )
    }
}

export default connect()(PublishArticle)