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
        <Header style={{ backgroundColor: '#1890ff', height: 'auto', padding: '0' }}>
            <PageHeader />
        </Header>
        <Layout style={{ padding: '20px 10px' }}>
            <Content>
                <VisibleArticleList />
            </Content>
            <Sider trigger={null} width='350' breakpoint='md' collapsedWidth='0' style={{ backgroundColor: '#fff' }}>
                <SidePanel />
            </Sider>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
            <PageFooter />
        </Footer>
    </Layout>    
)

export default CSSModules(MainPage, styles)