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
        <Header>
            <PageHeader />
        </Header>
        <Layout>
            <Content>
                <VisibleArticleList />
            </Content>
            <Sider width='400' breakpoint='lg' collapsedWidth="200">
                <SidePanel />
            </Sider>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
            <PageFooter />
        </Footer>
    </Layout>    
)

export default CSSModules(MainPage, styles)