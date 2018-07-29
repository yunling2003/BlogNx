import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import VisibleArticleList from './VisibleArticleList'
import SelectedArticle from './SelectedArticle'
import Login from '../components/Login'
import { ArticleListLayout, LoginLayout } from './Layout'

class Root extends Component {    
    render() {
        return (
            <Provider store={this.props.store}>        
                <Router>
                    <Switch>   
                        <ArticleListLayout path="/" exact component={VisibleArticleList} />
                        <ArticleListLayout path="/article/:id" component={SelectedArticle} />
                        <LoginLayout path="/login" component={Login} />
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