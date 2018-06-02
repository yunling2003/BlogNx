import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainPage from '../components/MainPage'
import VisibleArticleList from '../containers/VisibleArticleList'
import SelectedArticle from '../containers/SelectedArticle'

const Root = ({ store }) => (    
    <Provider store={store}>        
        <Router>      
            <Switch>
                <MainPage>
                    <Switch>
                        <Route path="/" exact component={VisibleArticleList} />
                        <Route path="/article/:id" component={SelectedArticle} />
                    </Switch>
                </MainPage>
            </Switch>
        </Router>
    </Provider>
)


Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root