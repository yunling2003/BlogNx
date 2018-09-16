import * as API from '../api'

export const BEGIN_SIGNIN = 'BEGIN_SIGNIN'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const SIGN_OUT = 'SIGN_OUT'

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

export function signOut() {
    return {
        type: SIGN_OUT
    }
}

function signInUser(loginObj) {
    const { userName, password } = loginObj
    return dispatch => {
        dispatch(beginSignIn())
        return API.signIn({
            userName: userName.value,
            password: password.value
        }).then(res => {
            if(res.data.code === 'success') {
                dispatch(signInSuccess({
                    userName: userName.value,
                    token: res.data.authToken
                }))
            }
            if(res.data.code === 'error') {
                dispatch(signInError({
                    message: res.data.message
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