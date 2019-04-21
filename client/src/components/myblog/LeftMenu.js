import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { selectMenu } from '../../actions/myblog'

const { SubMenu } = Menu

class LeftMenu extends Component {
    handleClick = (e) => {
        switch(e.key) {
            case 'info_profile':
                this.props.history.push('/myblog/info/profile')
                this.props.selectMenu('info_profile')
                break
            case 'info_portrait':
                this.props.history.push('/myblog/info/portrait')
                this.props.selectMenu('info_portrait')
                break
            case 'article_list':
                this.props.history.push('/myblog/article/list')
                this.props.selectMenu('article_list')
                break
            case 'article_publish':
                this.props.history.push('/myblog/article/publish')
                this.props.selectMenu('article_publish')
                break
            default:
                return
        }
    }

    render() {
        const { selectedMenu } = this.props.articles
        return (
            <Menu mode='inline'
                defaultSelectedKeys={['article_list']}
                defaultOpenKeys={['info', 'article']}
                selectedKeys={[selectedMenu]}
                onClick={this.handleClick}
                style={{ height: '100%', borderRight: 0 }}>
                <SubMenu key="info" title={<span><Icon type="profile" />基本信息</span>}>
                    <Menu.Item key="info_profile">个人档案</Menu.Item>  
                    <Menu.Item key="info_portrait">头像设置</Menu.Item>                                  
                </SubMenu>
                <SubMenu key="article" title={<span><Icon type="laptop" />博文管理</span>}>
                    <Menu.Item key="article_list">我的发布</Menu.Item>
                    <Menu.Item key="article_favorite">我的收藏</Menu.Item>
                    <Menu.Item key="article_publish">发布文章</Menu.Item>                                    
                </SubMenu>
            </Menu>
        )
    }
}

function mapStateToProps(state) {
    return {
        articles: state.myArticles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectMenu: (menu) => dispatch(selectMenu(menu))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeftMenu))