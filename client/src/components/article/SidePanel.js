import React from 'react'
import { Input, Select, Collapse } from 'antd'
import { Row, Col, Icon } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './SidePanel.css'

const Panel = Collapse.Panel
const Search = Input.Search
const Option = Select.Option

const selectBefore = (
    <Select defaultValue="博文" style={{ width: 70 }}>
      <Option value="Blog">博文</Option>
      <Option value="Author">作者</Option>
      <Option value="Tag">标签</Option>
    </Select>
)

const customPanelStyle = {
    background: '#1890ff',
    borderRadius: 4,    
    overflow: 'hidden'    
}

const SidePanel = (state = {}) => (
    <div>
        <div styleName='search'>
            <Search addonBefore={selectBefore} placeholder="Search here..." enterButton />
        </div>
        <div styleName='recommend'>
            <Row>
                <Col span={24}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel disabled={true} showArrow={false} header="博文排行" key="1" style={customPanelStyle}>
                            <ul styleName='blogList'>
                                <li><a href="#">游戏开发过程中需求变化那些事</a></li>
                                <li><a href="#">基于jest和puppeteer的前端自动化测试实战</a></li>
                                <li><a href="#">Docker 镜像之进阶篇</a></li>
                                <li><a href="#">分布式之redis复习精讲</a></li>
                                <li><a href="#">Java 字符流文件读写</a></li>
                                <li><a href="#">浅谈字节码生成与热部署</a></li>
                            </ul>
                        </Panel>                    
                    </Collapse>
                </Col>
            </Row>
        </div>
        <div styleName='webLink'>
            <Row>
                <Col span={24}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel disabled={true} showArrow={false} header="网站链接" key="1" style={customPanelStyle}>
                            <ul styleName='linkList'>
                                <li><a href="https://www.iamstoneshi.com" target="_blank">Stone的技术博客</a></li>
                                <li><a href="https://www.csdn.net/" target="_blank">CSDN</a></li>
                                <li><a href="https://www.cnblogs.com/" target="_blank">博客中国</a></li>
                                <li><a href="https://www.zhihu.com" target="_blank">知乎</a></li>
                                <li><a href="https://segmentfault.com/" target="_blank">segmentfault</a></li>                                                                                               
                            </ul>
                        </Panel>                    
                    </Collapse>
                </Col>
            </Row>
        </div>
    </div>
)

export default CSSModules(SidePanel, styles)