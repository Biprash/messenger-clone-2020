import React from 'react'
import Actions from '../components/Actions'
import Chat from '../components/Chat'
import ContentHeader from '../components/ContentHeader'
import Sidebar from '../components/Sidebar'
import { useAuthValue } from '../store/AuthProvider'

function Home(props) {
    const user = props.history.location.detail
    const [{ username, token }] = useAuthValue()
    console.log(props, 'home props');
    return (
        <>
            <Sidebar />
            <div className="main_content">
                <ContentHeader user={user} />
                <div className="chat__area">
                    <Chat user={user} username={username} token={token} />
                    <Actions user={user} />
                </div>
            </div>
        </>
    )
}

export default Home
