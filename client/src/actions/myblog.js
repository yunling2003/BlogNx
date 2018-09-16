
export const ARTICLE_FETCH_BEGIN = 'ARTICLE_FETCH_BEGIN'
export const ARTICLE_FETCH_REQUESTED = 'ARTICLE_FETCH_REQUESTED'
export const ARTICLE_FETCH_END = 'ARTICLE_FETCH_END'
export const ARTICLE_RECEIVED = 'ARTICLE_RECEIVED'

export function beginFetchArticles() {
    return {
        type: ARTICLE_FETCH_BEGIN
    }
}

export function requestFetchArticles() {
    return {
        type: ARTICLE_FETCH_REQUESTED
    }
}

export function endFetchArticles() {
    return {
        type: ARTICLE_FETCH_END
    }
}

export function receiveArticles(json) {
    return {
        type: ARTICLE_RECEIVED,
        totalCount: json.articles.length,
        articles: json.articles
    }
}