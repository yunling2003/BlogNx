import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Upload, Icon, Modal, message } from 'antd'
import { API_URL } from '../../utils/http'
import { refreshToken, setPortrait } from '../../actions/auth'

class Portrait extends Component {
    state = {
        loading: false,
        previewVisible: false,
        previewImage: '',
        imgList: [],
    }

    beforeUpload = (file) => {
        const isPic = ['image/gif','image/jpeg','image/jpg','image/png','image/svg'].indexOf(file.type) >= 0
        if (!isPic) {
            message.error('只允许上传jpg/png/gif/svg文件!')
        }
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isLt1M) {
            message.error('图片不能大于1M!')
        }
        return isPic && isLt1M
    }

    handleCancel = () => this.setState({ 
        previewVisible: false 
    })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        })
    }

    handleChange = ({ file, fileList }) => {              
        if (file.status === 'uploading') {
            this.setState({ 
                loading: true 
            })            
        }
        if (file.status === 'done') {
            this.props.setPortrait(file.response.url)  
            this.setState({              
                loading: false,
            })
        }
        if(file.status === 'error') {
            console.log('File upload failed!')
            this.setState({              
                loading: false,
            })
        }
        
        this.setState({ 
            imgList: fileList
         })
    }

    componentDidMount(){
        if(this.props.user.profile.portrait != null) {
            this.setState({
                imgList: [{
                    uid: this.props.user.userName,
                    name: `${this.props.user.userName}_portrait`,
                    status: 'done',
                    url: this.props.user.profile.portrait
                }]
            })        
        }        
    }

    render(){
        const { previewVisible, previewImage, imgList, loading} = this.state
        const uploadButton = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div style={{fontSize: '20px'}}>上传</div>
            </div>
        )
        const uploadUrl = `${API_URL}/myblog/info/uploadPortrait?user=${this.props.user.userName}`
        return (
            <div>
                <div style={{margin: '70px 0 30px 0', textAlign: 'center'}}>请上传用于显示的头像照片(jpg/png/gif/svg, 小于1M)</div>
                <div style={{textAlign: 'center'}}>
                    <div style={{display: 'inline-block'}}>
                        <Upload                        
                            action={uploadUrl}                            
                            listType='picture-card'
                            fileList={imgList}
                            beforeUpload={this.beforeUpload}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {imgList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="肖像图片" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {    
        user: state.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        refreshToken: (token) => dispatch(refreshToken(token)),
        setPortrait: (url) => dispatch(setPortrait(url))    
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portrait)