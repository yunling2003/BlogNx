import fetch from 'cross-fetch'

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES'

function requestArticles() {
    return {
        type: REQUEST_ARTICLES
    }
}

function receiveArticles(json) {
    return {
        type: RECEIVE_ARTICLES,
        articles: json
    }
}

function fetchArticles() {
    return dispatch => {
        dispatch(requestArticles())
        return fetch('http://localhost:3000/articles?page=0')
            .then(response => response.json())
            .then(json => dispatch(receiveArticles(json)))
    }
}

function shouldFetchArticles(state) {
    const articles = state.articles
    if (!articles) {
        return true
    } else if (articles.isFetching) {
        return false
    } else {
        return articles.didInvalidate
    }
}

export function fetchArticlesIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchArticles(getState())) {
            return dispatch(fetchArticles())
        }
    }
}