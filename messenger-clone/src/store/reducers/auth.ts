import * as actionTypes from '../actions/actionsTypes'
import { updateObject } from '../utility'

interface InitialState {
    user: any
    token: string
    username: string
    error: any
    loading: boolean
} 

export const initialState: InitialState = {
    user: null,
    token: '',
    username: '',
    error: null,
    loading: false
}

const authStart = (state: InitialState, action: any) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const authSuccess = (state: InitialState, action: any) => {
    return updateObject(state, {
        error: null,
        token: action.token,
        username: action.username,
        loading: false
    })
}

const authFail = (state: InitialState, action: any) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state: InitialState, action: any) => {
    return updateObject(state, {
        user: null,
        error: null,
        token: null,
        username: null,
        loading: false
    })
}

const authUser = (state: InitialState, action: any) => {
    return updateObject(state, {
        user: action.user
    })
}

const reducer = (state = initialState, action: any) => {
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