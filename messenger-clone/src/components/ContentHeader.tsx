import { Avatar } from "@mui/material";
import { Call, VideocamRounded, Info } from '@mui/icons-material'

import "../css/ContentHeader.css";
import { SERVER_URL } from "../settings";

function ContentHeader(props: {user: any}) {
  const user = props.user;
  console.log('user', user, props)
  return (
    <div className="contentheader">
      <div className="contentheader__left">
        <Avatar src={`${SERVER_URL}${user?.profile_pic}`} />
        <h3>{user?.username}</h3>
      </div>
      <div className="contentheader__gap"></div>
      <div className="contentheader__right">
        <Call />
        <VideocamRounded />
        <Info />
      </div>
    </div>
  );
}

export default ContentHeader;
