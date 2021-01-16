import React from 'react'
import { Avatar } from '@material-ui/core'
import CallIcon from '@material-ui/icons/Call';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import InfoIcon from '@material-ui/icons/Info';
import '../css/ContentHeader.css'
import { SERVER_URL } from '../settings';

function ContentHeader(props) {
    const user = props.user
    return (
        <div className="contentheader">
            <div className="contentheader__left">
                <Avatar src={`${SERVER_URL}${user.profile_pic}`} />
                <h3>{user.username}</h3>
            </div>
            <div className="contentheader__gap"></div>
            <div className="contentheader__right">
                <CallIcon />
                <VideocamRoundedIcon />
                <InfoIcon />
            </div>
        </div>
    )
}

export default ContentHeader
