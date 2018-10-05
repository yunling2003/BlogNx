
export const ARTICLE_FETCH_BEGIN = 'ARTICLE_FETCH_BEGIN'
export const ARTICLE_FETCH_REQUESTED = 'ARTICLE_FETCH_REQUESTED'
export const ARTICLE_FETCH_END = 'ARTICLE_FETCH_END'
export const ARTICLE_RECEIVED = 'ARTICLE_RECEIVED'

export const ARTICLE_PUBLISH_REQUESTED = 'ARTICLE_PUBLISH_REQUESTED'
export const ARTICLE_PUBLISH_BEGIN = 'ARTICLE_PUBLISH_BEGIN'
export const ARTICLE_PUBLISH_END = 'ARTICLE_PUBLISH_END'
export const ARTICLE_PUBLISH_RESPONSE = 'ARTICLE_PUBLISH_RESPONSE'
export const CLEAR_ARTICLE_PUBLISH_STATUS = 'CLEAR_ARTICLE_PUBLISH_STATUS'

export const SELECT_MENU = 'SELECT_MENU'

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

export function beginPublishArticle() {
    return {
        type: ARTICLE_PUBLISH_BEGIN
    }
}

export function requestPublishArticle(article) {
    return {
        type: ARTICLE_PUBLISH_REQUESTED,
        article
    }
}

export function endPublishArticle() {
    return {
        type: ARTICLE_PUBLISH_END
    }
}

export function receiveArticlePublishResponse(json) {
    return {
        type: ARTICLE_PUBLISH_RESPONSE,
        status: json.status,
        publishMessage: json.message
    }
} 

export function clearArticlePublishStatus() {
    return {
        type: CLEAR_ARTICLE_PUBLISH_STATUS
    }
}

export function selectMenu(menu) {
    return {
        type: SELECT_MENU,
        menu
    }
}