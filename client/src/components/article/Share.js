import React, {Component} from 'react'
import { Icon, Tooltip, Modal } from 'antd'
import { prepareWeixinShare } from '../../socialmedia/weixin'
import QRCode from 'qrcode.react' 
import CSSModules from 'react-css-modules'
import styles from './Share.css'

class Share extends Component {
    state = { qrCodeVisible: false }

    async componentWillMount() {
        const shareObj = this.props.content
        await prepareWeixinShare(shareObj)
    }

    openWxQrcode = () => {
        this.setState({ qrCodeVisible: true })
    }

    handleCancel = () => {
        this.setState({ qrCodeVisible: false })
    }

    render() {
        return (
            <div styleName='pull-right'>
                <ul styleName='share-list'>                    
                    <li>
                        <Tooltip title="分享到微博">
                            <Icon type="weibo" style={{ fontSize: '24px', color: 'deeppink' }} />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip title="分享到微信">
                            <Icon type="wechat" style={{ fontSize: '24px', color: 'green' }} onClick={this.openWxQrcode} />
                        </Tooltip>                        
                    </li>
                    <li>
                        <Tooltip title="分享到推特">
                            <Icon type="twitter" style={{ fontSize: '24px', color: 'skyblue' }} />
                        </Tooltip>                        
                    </li>
                    <li>
                        <Tooltip placement="topLeft" title="分享到脸书">
                            <Icon type="facebook" style={{ fontSize: '24px', color: 'blue' }} />
                        </Tooltip>                        
                    </li>
                </ul>
                <Modal
                    visible={this.state.qrCodeVisible}
                    title="微信二维码"                    
                    onCancel={this.handleCancel}
                    footer={null}
                    >
                    <QRCode value={location.href} />
                </Modal>                
            </div>
        )
    }
}

export default CSSModules(Share, styles)