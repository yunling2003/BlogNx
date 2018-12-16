import { call, put, all, takeEvery, select } from 'redux-saga/effects'
import { GET_COMMENTSCOUNT,
    LOAD_COMMENTS,
    CREATE_COMMENT,    
    receiveCommentsCount,
    receiveComments,
    loadComments,
    getCommentsCount } from '../actions/article'
import {     
    ARTICLE_FETCH_REQUESTED,
    beginFetchArticles,
    receiveArticles,
    endFetchArticles,
    ARTICLE_PUBLISH_REQUESTED,
    beginPublishArticle,
    endPublishArticle,
    receiveArticlePublishResponse,
    ARTICLE_EDIT_REQUESTED,
    beginDeleteArticle,
    endDeleteArticle,
    ARTICLE_DELETE_REQUESTED
 } from '../actions/myblog'
import { refreshToken } from '../actions/auth'
import * as API from '../api'

function* getCredentials() {
    return {
        uid: yield select(state => state.currentUser.userName),
        token: yield select(state => state.currentUser.token)
    }
}

function* fetchMyArticles() {    
    yield put(beginFetchArticles())        
    const res = yield call(API.getMyPublishedArticles, yield call(getCredentials))
    if(res) {            
        yield put(refreshToken(res.headers.authtoken))
        yield put(receiveArticles(res.data))
    } else {
        console.error('Error occurred!')    
    }                
    yield put(endFetchArticles())
}

function* fetchMyArticlesAsync() {
    yield takeEvery(ARTICLE_FETCH_REQUESTED, fetchMyArticles)
}

function* publishArticle(action) {
    yield put(beginPublishArticle())    
    const res = yield call(API.publishArticle, action.article, yield call(getCredentials))
    if(res) {
        yield put(refreshToken(res.headers.authtoken))
        yield put(receiveArticlePublishResponse(res.data))            
    } else {
        console.error('Error occurred!')
    }    
    yield put(endPublishArticle())
}

function* publishArticleAsync() {
    yield takeEvery(ARTICLE_PUBLISH_REQUESTED, publishArticle)
}

function* editArticle(action) {
    yield put(beginPublishArticle())    
    const res = yield call(API.editArticle, action.article, yield call(getCredentials))
    if(res) {
        yield put(refreshToken(res.headers.authtoken))
        yield put(receiveArticlePublishResponse(res.data))            
    } else {
        console.error('Error occurred!')
    }    
    yield put(endPublishArticle())
}

function* editArticleAsync() {
    yield takeEvery(ARTICLE_EDIT_REQUESTED, editArticle)
}

function* deleteArticle(action) {
    yield put(beginDeleteArticle())    
    const res = yield call(API.deleteArticle, action.id, yield call(getCredentials))        
    if(res) {            
        yield put(refreshToken(res.headers.authtoken))                  
    } else {
        console.error('Error occurred!')    
    }       
    yield put(endDeleteArticle())
}

function* deleteArticleAndRefresh(action) {
    yield call(deleteArticle, action)
    yield call(fetchMyArticles)    
}

function* deleteArticleAndRefreshAsync() {
    yield takeEvery(ARTICLE_DELETE_REQUESTED, deleteArticleAndRefresh)
}

function* getArticleCommentsCount(action) {
    const res = yield call(API.getCommentsCount, action.articleId)
    if(res) {
        yield put(receiveCommentsCount(action.articleId, res.data.count))
    }
}

function* getCommentsCountAsync() {
    yield takeEvery(GET_COMMENTSCOUNT, getArticleCommentsCount)
}

function* loadArticleComments(action) {
    const res = yield call(API.loadComments, action.articleId, action.page, action.pageSize)
    if(res) {
        yield put(receiveComments(action.articleId, res.data.comments))
    }
}

function* loadCommentsAsync() {
    yield takeEvery(LOAD_COMMENTS, loadArticleComments)
}

function* createComment(action) {   
    const res = yield call(API.createComment, action.articleId, action.reviewer, action.content, yield call(getCredentials))        
    if(res) {            
        yield put(refreshToken(res.headers.authtoken))
        yield put(loadComments(action.articleId, 0, 10))
        yield put(getCommentsCount(action.articleId))
    } else {
        console.error('Error occurred!')    
    }       
}

function* createCommentAsync() {
    yield takeEvery(CREATE_COMMENT, createComment)
}

export default function* rootSaga() {
    yield all([
        fetchMyArticlesAsync(), 
        publishArticleAsync(),
        editArticleAsync(),
        deleteArticleAndRefreshAsync(),
        getCommentsCountAsync(),
        loadCommentsAsync(),
        createCommentAsync()
    ])
}