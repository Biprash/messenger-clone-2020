import { Avatar } from "@mui/material";
import { Settings, VideoCall, Chat } from '@mui/icons-material'
import ChatList from "./ChatList";
import "../css/Sidebar.css";
import { SERVER_URL } from "../settings";
import { useAuthValue } from "../store/AuthProvider";

function Sidebar() {
  const [{ user }] = useAuthValue();

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={`${SERVER_URL}${user.profile_pic}/`} />
        <h2 className="sidebar__title">Chats</h2>
        <div className="sidebar__gap"></div>
        <div className="sidebar__options">
          <Settings />
          <VideoCall />
          <Chat />
        </div>
      </div>

      <div className="sidebar__body">
        <ChatList />
      </div>
    </div>
  );
}

export default Sidebar;
