import { Component, FormEvent } from 'react'
import '../css/Chat.css';
import { AddCircle, Gif, InsertDriveFile, ImageOutlined, EmojiEmotions, ThumbUp } from '@mui/icons-material'
import ChatMessages from './ChatMessages';

import WebSocketInstance from '../websocket'

interface ActionProps {
    user: any,
    username: string,
    token: string
}
interface ActionState {
    message: string
    messages: any
}

class Chat extends Component<ActionProps, ActionState> {
    constructor(props: ActionProps) {
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
            let x = this.addMessage.bind(this)
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
            WebSocketInstance.fetchMessages(
                this.props.username,
                this.props.user.group_name
            )
        })
        WebSocketInstance.connect(this.props.user.group_name, this.props.token)
    }

    waitForSocketConnection(callback: () => void) {
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

    componentDidUpdate(newProps: ActionProps) {
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

    setMessages(messages: any[]) {
        this.setState({
            messages: messages.reverse()
        })
        // console.log(messages, 'messages')
    }

    addMessage(message: any) {
        this.setState({
            messages: [...this.state.messages, message]
        })
        // console.log(message, 'new message')
    }

    handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
                        <AddCircle />
                        <span className="chat__sender__invisible">
                            <Gif />
                            <InsertDriveFile />
                            <ImageOutlined />
                        </span>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="chat__sender__center">
                            <input value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} type="text" name="message" placeholder="Type a message..." id="" />
                            <button type="submit" className="form__button">Send</button>
                            <EmojiEmotions />
                        </div>
                    </form>
                    <div className="chat__sender__right">
                        <ThumbUp />
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat
