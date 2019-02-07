import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import VisibleArticleList from './article/VisibleArticleList'
import ArticleDetail from './article/ArticleDetail'
import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'
import RegisterResult from './auth/RegisterResult'
import requireAuth from './myblog/RequireAuth'
import ArticleList from './myblog/ArticleList'
import PublishArticle from './myblog/PublishArticle'
import EditArticle from './myblog/EditArticle'
import { ArticleListLayout, LoginLayout, MyBlogLayout } from './Layout'

class Root extends Component {    
    render() {
        return (
            <Provider store={this.props.store}>        
                <Router>
                    <Switch>   
                        <ArticleListLayout path="/" exact component={VisibleArticleList} />
                        <ArticleListLayout path="/article/:id" component={ArticleDetail} />
                        <LoginLayout path="/login" page="login" component={LoginForm} />
                        <LoginLayout path="/register" page="register" component={RegisterForm} />
                        <LoginLayout path="/registerresult/:result" component={RegisterResult} />
                        <MyBlogLayout path="/myblog/article/list" component={requireAuth(ArticleList)} />
                        <MyBlogLayout path="/myblog/article/publish" component={requireAuth(PublishArticle)} />
                        <MyBlogLayout path="/myblog/article/edit/:id" component={requireAuth(EditArticle)} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root