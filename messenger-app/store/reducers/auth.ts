import * as actionTypes from '../actions/ActionsTypes'
import { updateObject } from '../Utility'

export interface AuthState {
    user: any
    token: string
    username: string
    error: any
    loading: boolean
} 

export type AuthReducer = (state: AuthState, action: actionTypes.AuthAction) => AuthState;

export const initialState: AuthState = {
    user: null,
    token: '',
    username: '',
    error: null,
    loading: false
}

const authStart = (state: AuthState, action: any) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const authSuccess = (state: AuthState, action: any) => {
    return updateObject(state, {
        error: null,
        token: action.token,
        username: action.username,
        loading: false
    })
}

const authFail = (state: AuthState, action: any) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state: AuthState, action: any) => {
    return updateObject(state, {
        user: null,
        error: null,
        token: null,
        username: null,
        loading: false
    })
}

const authUser = (state: AuthState, action: any) => {
    return updateObject(state, {
        user: action.user
    })
}

const reducer: AuthReducer = (state: AuthState = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAIL:
            return authFail(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        case actionTypes.AUTH_USER:
            return authUser(state, action)
        default:
            return state
    }
}

export default reducer