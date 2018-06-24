import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout } from 'antd'
import PageHeader from '../components/PageHeader'
import PageFooter from '../components/PageFooter'
import SidePanel from '../components/SidePanel'
import VisibleArticleList from '../containers/VisibleArticleList'
import SelectedArticle from '../containers/SelectedArticle'

const { Header, Footer, Sider, Content } = Layout

const routes = [
    { path: '/',
      exact: true,
      sidebar: SidePanel,
      main: VisibleArticleList
    },
    { path: '/article/:id',
      sidebar: SidePanel,
      main: SelectedArticle
    }
  ]

class Root extends Component {
    state = {
        siderHeight: 'auto'
    }

    onCollapse = (collapsed) => {
        this.setState({ siderHeight: collapsed ? 0 : 'auto' })
    }

    render() {
        return (
            <Provider store={this.props.store}>        
                <Router>      
                    <Layout style={{ height: '100%' }}>
                        <Header style={{ backgroundColor: '#1890ff', height: 'auto', padding: '0' }}>
                            <PageHeader />
                        </Header>
                        <Layout style={{ padding: '20px 10px' }}>
                            <Content>
                                {routes.map((route, index) => (          
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.main}
                                    />
                                ))}
                            </Content>
                            <Sider collapsible onCollapse={this.onCollapse}
                                trigger={null} 
                                width={350} 
                                breakpoint='md' 
                                collapsedWidth='0' 
                                style={{backgroundColor: 'inherit', height: this.state.siderHeight}}>
                                {routes.map((route, index) => (          
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.sidebar}
                                    />
                                ))}
                            </Sider>
                        </Layout>
                        <Footer style={{ textAlign: 'center' }}>
                            <PageFooter />
                        </Footer>
                    </Layout>
                </Router>
            </Provider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root