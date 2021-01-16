import React, { useEffect, useState } from 'react'
import '../css/Login.css'
import * as actions from '../store/actions/auth'
import { useAuthValue } from '../store/AuthProvider'
import { useHistory } from 'react-router-dom'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [state, dispatch] = useAuthValue()
    const history = useHistory()

    useEffect(() => {
        if (history.location !== '/') {
            history.push('/')
        }

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        actions.authLogin(dispatch, username, password)
        setUsername('')
        setPassword('')
    }
    return (
        <div className="login">
            <img src="https://lh3.googleusercontent.com/rkBi-WHAI-dzkAIYjGBSMUToUoi6SWKoy9Fu7QybFb6KVOJweb51NNzokTtjod__MzA" alt="" />
            <h1>Hang out anytime, anywhere</h1>
            <p>Messenger makes it easy and fun to stay close to your favorite people.</p>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input autoFocus onChange={(e) => setUsername(e.target.value)} value={username} type="text" name="username" placeholder="Username" />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" placeholder="password" />
                <input className="signin" type="submit" value="Sign In" />
            </form>

            <button className="facebooksignin">Sign In with Facebook</button>
        </div>
    )
}

export default Login
