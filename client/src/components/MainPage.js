import React from 'react'
import { Layout } from 'antd'
import PageHeader from './PageHeader'
import PageFooter from './PageFooter'
import InfoPanel from './InfoPanel'
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
            <Sider>
                <InfoPanel />
            </Sider>
        </Layout>
        <Footer>
            <PageFooter />
        </Footer>
    </Layout>    
)

export default CSSModules(MainPage, styles)