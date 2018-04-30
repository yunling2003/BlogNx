import { combineReducers } from 'redux'

const articles = (state = [], action) => {
    switch (action.type) {
        case 'SELECT_ARTICLE':
            return state.map(article => 
                (article.id === action.id)
                ? {...article, selected: true}
                : article
            )
        default:
            return state
    }
}

const blogReducer = combineReducers({
    articles
})

export default blogReducer