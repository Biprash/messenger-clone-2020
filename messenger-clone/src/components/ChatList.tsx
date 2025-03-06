import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MoreHoriz } from '@mui/icons-material'
import { Avatar } from "@mui/material";
import { SERVER_URL } from "../settings";
import { useAuthValue } from "../store/AuthProvider";
import "../css/ChatList.css";

import axios from "axios";

function ChatList() {
  const height = window.innerHeight - 60;
  const [{ token }] = useAuthValue();
  const [friends, setFriends] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(props, 'effect')
    // if (props) {
      // axios.defaults.headers = {
      //   "Content-Type": "application/json",
      //   Authorization: `Token ${token}`,
      // };
      axios
        .get(`${SERVER_URL}/chat/api/contact/`, {
          headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        }})
        .then((res) => {
          setFriends(res.data.friends);
          // history.push({
          //   pathname: `/${res.data.friends[0].group_name}`,
          //   detail: res.data.friends[0],
          // });
          navigate(`/${res.data.friends[0].group_name}`, { state: { user: res.data.friends[0] } })
        })
        .catch((err) => {
          console.error(err);
        });
    // }
  }, []);

  return (
    <>
      {friends ? (
        <div className="chatlist" style={{ height: height }}>
          <div className="chatlist__input">
            <Search />
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
            {friends?.map((friend, index) => {
              return (
                // <Link key={`friend${index}`} to={friend.group_name}>
                // <Link
                //   key={`friend${index}`}
                //   to={{
                //     pathname: friend.group_name,
                //     detail: friend,
                //   }}
                // >
                <Link 
                  key={`friend${index}`} 
                  to={`/${friend.group_name}`} state={{ user: friend }}>

                  <li className="chat__item">
                    <div className="chatlist__item">
                      <Avatar src={`${SERVER_URL}${friend.profile_pic}`} />
                      <div className="chatlist__content">
                        <span className="chatlist__username">
                          {friend.username}
                        </span>
                        <p>
                          <span className="chatlist__message">
                            Lorem ipsum dolor sit amet consectetur dolor sit
                            amet consectetur adipisicing elit.
                          </span>
                          <span className="chatlist__timegap">.</span>
                          <span className="chatlist__time"> 20:24</span>
                        </p>
                      </div>
                      <MoreHoriz fontSize="small" />
                    </div>
                  </li>
                </Link>
              );
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
      ) : null}
    </>
  );
}

export default ChatList;
