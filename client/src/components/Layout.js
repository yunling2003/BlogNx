import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import ArticleHeader from './article/ArticleHeader'
import SidePanel from './article/SidePanel'
import LoginHeader from './auth/LoginHeader'
import MyBlogHeader from './myblog/MyBlogHeader'
import MyBlogBreadCrumb from './myblog/MyBlogBreadCrumb'
import LeftMenu from './myblog/LeftMenu'
import PageFooter from './shared/PageFooter'

const { Header, Footer, Sider, Content } = Layout

export class ArticleListLayout extends Component {
    state = {
        siderHeight: 'auto'
    }

    onCollapse = (collapsed) => {
        this.setState({ siderHeight: collapsed ? 0 : 'auto' })
    }

    render() {
        const { component: Component, ...rest } = this.props
        return (
            <Route {...rest} render={props => (
                <Layout style={{ height: '100%' }}>
                    <Header style={{ backgroundColor: '#1890ff', height: 'auto', padding: '0' }}>
                        <ArticleHeader />
                    </Header>
                    <Layout style={{ padding: '20px 10px' }}>
                        <Content>
                            <Component {...this.props} />
                        </Content>
                        <Sider collapsible onCollapse={this.onCollapse}
                                trigger={null} 
                                width={350} 
                                breakpoint='md' 
                                collapsedWidth='0' 
                                style={{backgroundColor: 'inherit', height: this.state.siderHeight}}>
                                <SidePanel />
                        </Sider>   
                    </Layout>
                    <Footer style={{ textAlign: 'center' }}>
                        <PageFooter />
                    </Footer>
                </Layout>
            )} />                                   
        )
    }
}

export class LoginLayout extends Component {
    render() {
        const { component: Component, page, ...rest } = this.props
        return (
            <Route {...rest} render={props => (
                <Layout style={{ height: '100%' }}>
                    <Header style={{ backgroundColor: '#1890ff', height: 'auto', padding: '0' }}>
                        <LoginHeader page={page} />
                    </Header>
                    <Layout style={{ padding: '20px 10px' }}>
                        <Content>
                            <Component {...this.props} />
                        </Content>                        
                    </Layout>
                    <Footer style={{ textAlign: 'center' }}>
                        <PageFooter />
                    </Footer>
                </Layout>
            )} />                                   
        )
    }
}

class MyBlogLayout extends Component {    
    render() {
        const { component: Component, ...rest } = this.props
        return (
            <Route {...rest} render={props => (
                <Layout style={{ height: '100%' }}>
                    <Header style={{ backgroundColor: '#fff', height: 'auto', padding: '0' }}>
                        <MyBlogHeader />
                    </Header>
                    <Layout>
                        <Sider 
                            trigger={null} 
                            breakpoint='md' 
                            collapsible
                            collapsedWidth='0' 
                            style={{ background: '#fff' }}>
                            <LeftMenu />
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <MyBlogBreadCrumb />
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                                <Component {...this.props} />
                            </Content>
                        </Layout>
                    </Layout>
                    <Footer style={{ textAlign: 'center' }}>
                        <PageFooter />
                    </Footer>
                </Layout>
            )} />
        )
    }
}

exports.MyBlogLayout = MyBlogLayout