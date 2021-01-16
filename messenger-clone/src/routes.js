import React from 'react'
import { Route } from 'react-router-dom'
import ChatList from './components/ChatList'
import Login from './components/Login'
import Home from './containers/Home'
import { useAuthValue } from './store/AuthProvider'

const BaseRouter = () => {
    const [{ token, username }] = useAuthValue()
    return (
        <>
            {token && username ?
                <>
                    <Route exact path='/' component={ChatList} />
                    <Route path='/:groupID/' component={Home} />
                </>
                :
                <Route path='/' component={Login} />
            }
        </>
    )
}

export default BaseRouter
