import React, { Component } from 'react'
import '../css/Chat.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GifIcon from '@material-ui/icons/Gif';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatMessages from './ChatMessages';

import WebSocketInstance from '../websocket'

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            messages: null
        }

    }

    componentDidMount() {
        this.initialiseChat()
    }

    initialiseChat() {
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
            WebSocketInstance.fetchMessages(
                this.props.username,
                this.props.user.group_name
            )
        })
        WebSocketInstance.connect(this.props.user.group_name,this.props.token)
    }

    waitForSocketConnection(callback) {
        const component = this
        setTimeout(
            () => {
                if (WebSocketInstance.state() === 1) {
                    console.log('Connection made');
                    callback();
                    return
                } else {
                    console.log('Waiting for connection');
                    component.waitForSocketConnection(callback)
                }
            }, 100
        )
    }

    componentWillReceiveProps(newProps) {
        if (this.props.user.group_name !== newProps.user.group_name) {
            // console.log(newProps, 'newprops')
            WebSocketInstance.disconnect()
            this.waitForSocketConnection(() => {
                WebSocketInstance.fetchMessages(
                    this.props.username,
                    newProps.user.group_name
                )
            })
            WebSocketInstance.connect(newProps.user.group_name, this.props.token)
        }
    }

    setMessages(messages) {
        this.setState({
            messages: messages.reverse()
        })
        // console.log(messages, 'messages')
    }

    addMessage(message) {
        this.setState({
            messages: [...this.state.messages, message]
        })
        // console.log(message, 'new message')
    }

    handleSubmit = (e) => {
        e.preventDefault()

        // some backend stuff
        WebSocketInstance.newChatMessage(this.state.message, this.props.username, this.props.user.group_name)

        this.setState({
            message: ''
        })
    }

    render() {
        const messages = this.state.messages
        return (
            <div className="chat">
                <ChatMessages messages={messages} user={this.props.user} />
                <div className="chat__sender">
                    <div className="chat__sender__left">
                        <AddCircleIcon />
                        <span className="chat__sender__invisible">
                            <GifIcon />
                            <InsertDriveFileIcon />
                            <ImageOutlinedIcon />
                        </span>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="chat__sender__center">
                            <input value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} type="text" name="message" placeholder="Type a message..." id="" />
                            <button type="submit" className="form__button">Send</button>
                            <EmojiEmotionsIcon />
                        </div>
                    </form>
                    <div className="chat__sender__right">
                        <ThumbUpIcon />
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat
