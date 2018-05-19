import React from 'react'
import { Layout } from 'antd'
import PageHeader from './PageHeader'
import PageFooter from './PageFooter'
import SidePanel from './SidePanel'
import VisibleArticleList from '../containers/VisibleArticleList'
import CSSModules from 'react-css-modules'
import styles from './MainPage.css'

const { Header, Footer, Sider, Content } = Layout

const MainPage = (state = {}) => (    
    <Layout style={{ height: '100%' }}>
        <Header style={{ backgroundColor: 'rgba(16, 142, 233, 1)' }}>
            <PageHeader />
        </Header>
        <Layout style={{ padding: '20px 10px' }}>
            <Content>
                <VisibleArticleList />
            </Content>
            <Sider width='400' breakpoint='lg' collapsedWidth='200' style={{ backgroundColor: '#f0f2f5', border: '1px solid blue' }}>
                <SidePanel />
            </Sider>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
            <PageFooter />
        </Footer>
    </Layout>    
)

export default CSSModules(MainPage, styles)