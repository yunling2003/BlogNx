import React from 'react'
import Header from './Header'
import Footer from './Footer'
import InfoPanel from './InfoPanel'
import VisibleArticleList from '../containers/VisibleArticleList'
import CSSModules from 'react-css-modules'
import styles from './MainPage.css'

const MainPage = (state = {}) => (
    <div>
        <div styleName='header'>
            <Header />
        </div>
        <div styleName='mainContent'>
            <div styleName='articleList'>
                <VisibleArticleList />
            </div>
            <div styleName='infoPanel'>
                <InfoPanel />
            </div>
        </div>
        <div styleName='footer'>
            <Footer />
        </div>
    </div>    
)

export default CSSModules(MainPage, styles)