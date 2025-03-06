import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './containers/Home'
import { useAuthValue } from './store/AuthProvider'
import ChatList from './components/ChatList'

const BaseRouter = () => {
    const [{ token, username }] = useAuthValue()
    return (
        <Routes>
            {token && username ?
                <>
                    <Route path='/' element={<ChatList />} />
                    <Route path='/:groupID/' element={<Home />} />
                </>
                :
                <Route path='/' element={<Login />} />
            }
        </Routes>
    )
}

export default BaseRouter
