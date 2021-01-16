import axios from 'axios'
import * as actionTypes from './actionsTypes'
import {SERVER_URL} from '../../settings'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (username, token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        username: username,
        token: token,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authUser = (user) => {
    return {
        type: actionTypes.AUTH_USER,
        user: user,
    }
}

export const authLogin = (dispatch, username, password) => {
    dispatch(authStart())
    axios.post(`${SERVER_URL}/rest-auth/login/`, {
        username: username,
        password: password,
    })
        .then(res => {
            // console.log(res, 'res');
            const token = res.data.key
            localStorage.setItem('token', token)
            localStorage.setItem('username', username)
            getUser(dispatch, username, token)
        })
        .catch(err => {
            console.log(err, 'err');
            dispatch(authFail(err))
        })
}

// export const authSignUp = (username, email, password1, password2) => {
//     return dispatch => {
//         dispatch(authStart())
//         axios.post('url', {
//             username: username,
//             email: email,
//             password1: password1,
//             password2: password2,
//         })
//             .then(res => {
//                 const token = res.data.token
//                 localStorage.setItem('token', token)
//                 localStorage.setItem('username', username)
//                 dispatch(authSuccess(username, token))
//             })
//             .catch(err => {
//                 dispatch(authFail(err))
//             })
//     }
// }

// export const authCheckState = () => {
//     return dispatch => {
//         const token = localStorage.getItem('token')
//         const username = localStorage.getItem('username')
//         if (token === undefined || username === undefined) {
//             dispatch(logout())
//         } else {
//             dispatch(authSuccess(username, token))
//         }
//     }
// }

export const getUser = (dispatch, username, token) => {
    axios.post(`${SERVER_URL}/chat/api/getuser/`, {
        username: username,
    })
        .then(res => {
            // console.log(res.data, 'res get');
            const user = res.data
            dispatch(authUser(user))
            dispatch(authSuccess(username, token))
        })
        .catch(err => {
            console.log(err, 'err');
            // dispatch(authFail(err))
        })
}