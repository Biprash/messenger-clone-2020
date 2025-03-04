import Actions from '../components/Actions'
import Chat from '../components/Chat'
import ContentHeader from '../components/ContentHeader'
import Sidebar from '../components/Sidebar'
import { useAuthValue } from '../store/AuthProvider'
import { useLocation } from 'react-router-dom'

function Home() {
    const location = useLocation();
    const user = location.state?.user; // Ensure safe access
    // const user = props.history.location.detail
    const [{ username, token }] = useAuthValue()
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
