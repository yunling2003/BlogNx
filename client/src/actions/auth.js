import  'cross-fetch/polyfill'

export const BEGIN_SIGNIN = 'BEGIN_SIGNIN'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export function beginSignIn() {
    return {
        type: BEGIN_SIGNIN
    }
}

export function signInSuccess(loginObj) {
    return {
        type: SIGNIN_SUCCESS,
        userName: loginObj.userName,
        token: loginObj.token
    }
}

export function signInError(errObj) {
    return {
        type: SIGNIN_ERROR,
        message: errObj.message
    }
}

export function clearError() {
    return {
        type: CLEAR_ERROR
    }
}

function signInUser(loginObj) {
    const { userName, password } = loginObj
    return dispatch => {
        dispatch(beginSignIn())
        return fetch(process.env.API_URL + '/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({                                    
                userName: userName.value,
                password: password.value                
            })
        }).then(res => res.json())
        .then(json => {
            if(json.code === 'success') {
                dispatch(signInSuccess({
                    userName: userName.value,
                    token: json.authToken
                }))
            }
            if(json.code === 'error') {
                dispatch(signInError({
                    message: json.message
                }))
            }
        }).catch(err => {
            dispatch(signInError({
                message: err
            }))
        })
    }
}

export function signIn(loginObj) {
    return dispatch => {
        return dispatch(signInUser(loginObj))
    }
}