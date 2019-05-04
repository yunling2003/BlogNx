const currentUserDefault = {
    userName: null,
    isLoggingIn: false,
    logInMessage: null,
    token: null,
    profile: {
        portrait: null
    }
}

const articleFiltersDefault = {
    page: 0,
    pageSize: 7
}

const articlesDefault = { 
    isFetching: false, 
    didInvalidate: true, 
    totalCount: 0, 
    items: [] 
}

const myArticlesDefault = {
    publish: {
        isPublishing: false,
        status: 'init',
        publishMessage: ''
    },
    selectedMenu: 'article_list',
    isFetching: false,
    isDeleting: false,
    didInvalidate: true,
    totalCount: 0,
    items: []
}

const initState = {
    currentUser: currentUserDefault,
    articleFilters: articleFiltersDefault,
    articles: articlesDefault,
    myArticles: myArticlesDefault
}

module.exports = initState