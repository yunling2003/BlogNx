import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import PageHeader from '../components/PageHeader'
import LoginHeader from '../components/LoginHeader'
import PageFooter from '../components/PageFooter'
import SidePanel from '../components/SidePanel'

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
                        <PageHeader />
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