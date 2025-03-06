import { Avatar } from "@mui/material";
import { Reply, MoreHoriz, SentimentSatisfiedOutlined } from '@mui/icons-material'
import "../css/ChatMessages.css";

import { useAuthValue } from "../store/AuthProvider";
import { SERVER_URL } from "../settings";

function ChatMessages(props: {messages: any[], user: any}) {
  const [{ username }] = useAuthValue();
  const height = window.innerHeight - (60 + 47);
  return (
    <div className="chatmessages" style={{ height: height }}>
      {props.messages &&
        props.messages.map((message) => {
          return (
            <div key={message.id}>
              {message.sender !== username ? (
                <div className="received">
                  <Avatar src={`${SERVER_URL}${props.user.profile_pic}`} />
                  <div className="received__messages">
                    <div className="received__message">
                      <div className="received__text">{message.message}</div>
                      <div className="received__icons">
                        <SentimentSatisfiedOutlined />
                        <Reply />
                        <MoreHoriz />
                      </div>
                    </div>
                    {/* <div className="received__message">
                <div className="received__text">
                  Some random text like Lorem ipsum!
                            </div>
                <div className="received__icons">
                  <SentimentSatisfiedOutlinedIcon />
                  <ReplyIcon />
                  <MoreHorizIcon />
                </div>
              </div> */}
                  </div>
                </div>
              ) : (
                <div className="sent">
                  <div className="sent__messages">
                    <div className="sent__message">
                      <div className="sent__text">{message.message}</div>
                      <div className="sent__icons">
                        <SentimentSatisfiedOutlined />
                        <Reply />
                        <MoreHoriz />
                      </div>
                    </div>
                    {/* <div className="sent__message">
                <div className="sent__text">
                  Some random text like Lorem ipsum!
                            </div>
                <div className="sent__icons">
                  <SentimentSatisfiedOutlinedIcon />
                  <ReplyIcon />
                  <MoreHorizIcon />
                </div>
              </div> */}
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default ChatMessages;
