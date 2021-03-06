import http from './utils/http'
import crypt from './utils/crypt'

export function getRecaptcha() {
    return http.get('/auth/recaptcha')
}

export function signIn(loginObj) {
    return http.post('/auth/signin', {
        userName: loginObj.userName,
        password: loginObj.password
    })
}

export function register(registerObj) {
    return http.post('/auth/register', {
        email: registerObj.email,
        userName: registerObj.userName,
        password: registerObj.password,
        chineseName: registerObj.chineseName,
        mobilePhone: registerObj.mobilePhone
    })
}

export function checkDuplicateName(name) {
    return http.get('/auth/register/checkDuplicate?userName=' + name)
}

export function getAllArticles(filters) {
    return http.get('/article?' + filters)
}

export function getArticleById(articleId) {
    return http.get('/article/getbyid', {
        params: {
            id: articleId
        }
    })
}

export function getProfile(credentials) {
    return http.get('/myblog/profile', {
        params: {
            uid: credentials.uid,
            sign: crypt.genSha256Sign(credentials.uid + credentials.token),            
        }
    })
}

export function saveProfile(profileObj, credentials) {
    return http({
        method: 'post',
        url: '/myblog/profile/save',
        params: {
            uid: credentials.uid,
            sign: crypt.genSha256Sign(credentials.uid + credentials.token)
        },
        data: {
            profile: profileObj
        }
    })
}

export function getMyPublishedArticles(credentials) {
    return http.get('/myblog/articles', {
        params: {
            uid: credentials.uid,
            sign: crypt.genSha256Sign(credentials.uid + credentials.token)
        }
    })
}

export function publishArticle(articleObj, credentials) {
    return http({
        method: 'post',
        url: '/myblog/article/publish',
        params: {
            uid: credentials.uid,
            sign: crypt.genSha256Sign(credentials.uid + credentials.token)
        },
        data: {
            article: articleObj
        }
    })    
}

export function editArticle(articleObj, credentials) {
    return http({
        method: 'post',
        url: '/myblog/article/edit',
        params: {
            uid: credentials.uid,
            sign: crypt.genSha256Sign(credentials.uid + credentials.token)
        },
        data: {
            article: articleObj
        }
    }) 
}

export function deleteArticle(id, credentials) {
    return http({
        method: 'post',
        url: '/myblog/article/delete',
        params: {
            uid: credentials.uid,
            sign: crypt.genSha256Sign(credentials.uid + credentials.token)
        },
        data: {
            id
        }
    })
}

export function getCommentsCount(id) {
    return http.get('article/comments/count', {
        params: {
            id: id
        }
    })
}

export function loadComments(id, page, pageSize) {
    return http.get('/article/comments/load', {
        params: {
            id: id,
            page: page,
            pageSize: pageSize
        }
    })
}

export function createComment(articleId, reviewer, content, credentials) {
    return http({
        method: 'post',
        url: '/article/comment/add',
        params: {
            uid: credentials.uid,
            sign: crypt.genSha256Sign(credentials.uid + credentials.token)
        },
        data: {
            articleId: articleId,
            reviewer: reviewer,
            content: content
        }
    })
}

export function uploadImage(imgObj, config) {
    return http.post('/myblog/article/uploadImage', imgObj, config)
}

export function getWeixinSignature(url) {
    return http.get('/weixin/getShare', {
        params: {
            url
        }
    })
}