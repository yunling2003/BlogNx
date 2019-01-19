import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as API from '../../../api'
import { Editor } from 'react-draft-wysiwyg'
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class ArticleEditor extends Component {
    onEditorStateChange = (state) => {
        this.props.editorStateChanged(state)
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

    render() {
        return <Editor editorState={this.props.state}
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
    }
}

ArticleEditor.propTypes = {
    state: PropTypes.object.isRequired,
    editorStateChanged: PropTypes.func.isRequired
}

export default ArticleEditor