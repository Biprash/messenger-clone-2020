import { Component } from 'react'
import { Avatar } from '@mui/material';
import {
  ArrowBackIos,
  ExpandMore,
  Search,
  BorderColor,
  RadioButtonCheckedOutlined,
  ThumbUp,
  Notifications,
  NotInterested,
  RemoveCircle,
  WarningRounded,
} from "@mui/icons-material";
import { SERVER_URL } from '../settings';
import '../css/Actions.css';

interface ActionProps {
    user: any
}
interface ActionState {
    isOpenMoreActions: boolean
    isOpenPrivacy: boolean
}

class Actions extends Component<ActionProps, ActionState> {
    constructor(props: ActionProps) {
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
                        {this.state.isOpenMoreActions ? <ExpandMore /> : <ArrowBackIos />}
                    </div>
                    {this.state.isOpenMoreActions ?
                        <>
                            <div className="actions__items">
                                <div className="actions__text">Search in conversation</div>
                                <Search />
                            </div>
                            <div className="actions__items">
                                <div className="actions__text">Edit nicknames</div>
                                <BorderColor />
                            </div>
                            <div className="actions__items blueicon">
                                <div className="actions__text">Change theme</div>
                                <RadioButtonCheckedOutlined />
                            </div>
                            <div className="actions__items blueicon">
                                <div className="actions__text">Change Emoji</div>
                                <ThumbUp />
                            </div>
                        </>
                        : null}
                </div>

                <div className="actions__privacy">
                    <div className="actions__header" onClick={() => { this.setState({ isOpenPrivacy: !this.state.isOpenPrivacy }) }} >
                        <span className="actions__headertext">Privacy and support</span>
                        {this.state.isOpenPrivacy ? <ExpandMore /> : <ArrowBackIos />}
                    </div>
                    {this.state.isOpenPrivacy ?
                        <>
                            <div className="actions__items">
                                <div className="actions__text">Notification</div>
                                <Notifications />
                            </div>
                            <div className="actions__items">
                                <div className="actions__text">Ignore messages</div>
                                <NotInterested />
                            </div>
                            <div className="actions__items">
                                <div className="actions__text">Block messages</div>
                                <RemoveCircle />
                            </div>
                            <div className="actions__items">
                                <div className="actions__text">Something's wrong</div>
                                <WarningRounded />
                            </div>
                        </>
                        : null}
                </div>

            </div>
        )
    }
}

export default Actions
