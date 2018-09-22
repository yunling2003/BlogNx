import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import VisibleArticleList from './article/VisibleArticleList'
import SelectedArticle from './article/SelectedArticle'
import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'
import RegisterResult from './auth/RegisterResult'
import requireAuth from './myblog/RequireAuth'
import ArticleList from './myblog/ArticleList'
import { ArticleListLayout, LoginLayout, MyBlogLayout } from './Layout'

class Root extends Component {    
    render() {
        return (
            <Provider store={this.props.store}>        
                <Router>
                    <Switch>   
                        <ArticleListLayout path="/" exact component={VisibleArticleList} />
                        <ArticleListLayout path="/article/:id" component={SelectedArticle} />
                        <LoginLayout path="/login" page="login" component={LoginForm} />
                        <LoginLayout path="/register" page="register" component={RegisterForm} />
                        <LoginLayout path="/registerresult/:result" component={RegisterResult} />
                        <MyBlogLayout path="/myblog/articles" component={requireAuth(ArticleList)} />
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