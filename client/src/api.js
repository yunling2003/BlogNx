import http from './utils/http'
import crypt from './utils/crypt'

export function getRecaptcha() {
    return http.get('/recaptcha')
}

export function signIn(loginObj) {
    return http.post('/signin', {
        userName: loginObj.userName,
        password: loginObj.password
    })
}

export function register(registerObj) {
    return http.post('/register', {
        email: registerObj.email,
        userName: registerObj.userName,
        password: registerObj.password,
        chineseName: registerObj.chineseName,
        mobilePhone: registerObj.mobilePhone
    })
}

export function checkDuplicateName(name) {
    return http.get('/register/checkDuplicate?userName=' + name)
}

export function getAllArticles(filters) {
    return http.get('/articles?' + filters)
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

export function uploadImage(imgObj, config) {
    return http.post('/myblog/article/uploadImage', imgObj, config)
}