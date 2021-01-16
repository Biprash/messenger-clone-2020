import { Avatar } from '@material-ui/core';
import React, { Component } from 'react'
import '../css/Actions.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import RadioButtonCheckedOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { SERVER_URL } from '../settings';

class Actions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpenMoreActions: true,
            isOpenPrivacy: false
        }
    }

    render() {
        const user = this.props.user
        const height = window.innerHeight - 61;
        return (
            <div className="actions" style={{ height: height }}>
                <div className="actions__info">
                    <Avatar src={`${SERVER_URL}${user.profile_pic}`} />
                    <h2 className="actions__username">{user.username}</h2>
                </div>

                <div className="actions__moreactions">
                    <div className="actions__header" onClick={() => { this.setState({ isOpenMoreActions: !this.state.isOpenMoreActions }) }} >
                        <span className="actions__headertext">More Actions</span>
                        {this.state.isOpenMoreActions ? <ExpandMoreIcon /> : <ArrowBackIosIcon />}
                    </div>
                    {this.state.isOpenMoreActions ?
                        <>
                            <div className="actions__items">
                                <div className="actions__text">Search in conversation</div>
                                <SearchIcon />
                            </div>
                            <div className="actions__items">
                                <div className="actions__text">Edit nicknames</div>
                                <BorderColorIcon />
                            </div>
                            <div className="actions__items blueicon">
                                <div className="actions__text">Change theme</div>
                                <RadioButtonCheckedOutlinedIcon />
                            </div>
                            <div className="actions__items blueicon">
                                <div className="actions__text">Change Emoji</div>
                                <ThumbUpIcon />
                            </div>
                        </>
                        : null}
                </div>

                <div className="actions__privacy">
                    <div className="actions__header" onClick={() => { this.setState({ isOpenPrivacy: !this.state.isOpenPrivacy }) }} >
                        <span className="actions__headertext">Privacy and support</span>
                        {this.state.isOpenPrivacy ? <ExpandMoreIcon /> : <ArrowBackIosIcon />}
                    </div>
                    {this.state.isOpenPrivacy ?
                        <>
                            <div className="actions__items">
                                <div className="actions__text">Notification</div>
                                <NotificationsIcon />
                            </div>
                            <div className="actions__items">
                                <div className="actions__text">Ignore messages</div>
                                <NotInterestedIcon />
                            </div>
                            <div className="actions__items">
                                <div className="actions__text">Block messages</div>
                                <RemoveCircleIcon />
                            </div>
                            <div className="actions__items">
                                <div className="actions__text">Something's wrong</div>
                                <WarningRoundedIcon />
                            </div>
                        </>
                        : null}
                </div>

            </div>
        )
    }
}

export default Actions
