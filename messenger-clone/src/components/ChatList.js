import React, { useState, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import '../css/ChatList.css'
import { SERVER_URL } from '../settings'
import { useAuthValue } from '../store/AuthProvider'
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios'

function ChatList(props) {
    const height = window.innerHeight - 60;
    const [{ token }] = useAuthValue()
    const [friends, setFriends] = useState()
    const history = useHistory()
    useEffect(() => {
        // console.log(props, 'effect')
        if (props) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            };
            axios
                .get(`${SERVER_URL}/chat/api/contact/`)
                .then(res => {
                    setFriends(res.data.friends)
                    history.push({ pathname: `/${res.data.friends[0].group_name}`, detail: res.data.friends[0] });
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }, [])

    return (<>
        {friends ?
            <div className="chatlist" style={{ height: height }}>
                <div className="chatlist__input">
                    <SearchIcon />
                    <input type="text" name="search" placeholder="Search Messenger" />
                </div>
                <ul className="chat__list">
                    {/* <li className="chat__item">
                    <div className="chatlist__item selected">
                        <Avatar src="https://scontent.fktm12-1.fna.fbcdn.net/v/t1.0-1/s100x100/120949435_385301072855845_646844020996162227_o.jpg?_nc_cat=103&_nc_sid=7206a8&_nc_ohc=-CfZBai-TQoAX_Apdk_&_nc_ht=scontent.fktm12-1.fna&tp=7&oh=df513f739cc2e5db76bcb781dd420fd9&oe=5FB32917" />
                        <div className="chatlist__content">
                            <span className="chatlist__username">Biprash Gautam</span>
                            <p><span className="chatlist__message">Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur adipisicing elit.</span>
                                <span className="chatlist__timegap">.</span><span className="chatlist__time">20:24</span></p>
                        </div>
                        <MoreHorizIcon fontSize="small" />
                    </div>
                </li> */}
                    {friends.map((friend, index) => {
                        return (
                            // <Link key={`friend${index}`} to={friend.group_name}>
                            <Link key={`friend${index}`} to={{
                                pathname: friend.group_name,
                                detail: friend
                            }}>
                                <li className="chat__item">
                                    <div className="chatlist__item">
                                        <Avatar src={`${SERVER_URL}${friend.profile_pic}`} />
                                        <div className="chatlist__content">
                                            <span className="chatlist__username">{friend.username}</span>
                                            <p><span className="chatlist__message">Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur adipisicing elit.</span>
                                                <span className="chatlist__timegap">.</span><span className="chatlist__time"> 20:24</span></p>
                                        </div>
                                        <MoreHorizIcon fontSize="small" />
                                    </div>
                                </li>
                            </Link>
                        )
                    })}

                    {/* <li className="chat__item">
                    <div className="chatlist__item">
                        <Avatar src="https://scontent.fktm12-1.fna.fbcdn.net/v/t1.0-1/s100x100/120949435_385301072855845_646844020996162227_o.jpg?_nc_cat=103&_nc_sid=7206a8&_nc_ohc=-CfZBai-TQoAX_Apdk_&_nc_ht=scontent.fktm12-1.fna&tp=7&oh=df513f739cc2e5db76bcb781dd420fd9&oe=5FB32917" />
                        <div className="chatlist__content">
                            <span className="chatlist__username chatlist__unread">Biprash Gautam</span>
                            <p><span className="chatlist__message chatlist__unread">Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur adipisicing elit.</span>
                                <span className="chatlist__timegap">.</span><span className="chatlist__time"> 20:24</span></p>
                        </div>
                        <MoreHorizIcon fontSize="small" />
                    </div>
                </li> */}
                </ul>
            </div>
            : null}
    </>
    )
}

export default ChatList
