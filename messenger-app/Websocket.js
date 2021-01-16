import { SocketUrl } from './Settings'

class WebsocketService {

    static instance = null

    callbacks = {}

    static getInstance() {
        if(!WebsocketService.instance) {
            WebsocketService.instance = new WebsocketService()
        }
        return WebsocketService.instance
    }
    
    constructor() {
        this.socketRef = null
    }

    connect(chatUrl, token) {
        const path = `${SocketUrl}/ws/chat/${chatUrl}/${token}/`
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {

        }
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data)
        }
        this.socketRef.onerror = e => {
            console.error(e)
        }
        this.socketRef.onclose = () => {
            console.error(e, 'Chat socket closed unexpectly')
        }
    }

    disconnect() {
        this.socketRef.close()
    }

    socketNewMessage(data) {
        const ParsedData = JSON.parse(data)
        const command = ParsedData.command

        if (command === 'messages') {
            this.callbacks[command](ParsedData.messages)
        }
        if (command === 'new_message') {
            this.callbacks[command](ParsedData)
        }
    }

    fetchMessage(username, roomName) {
        this.sendMessage({
            command: 'fetch_messages',
            username: username,
            groupName: roomName,
        })
    }

    newChatMessage(message, username, roomName) {
        this.sendMessage({
            command: 'new_message',
            message: message,
            from: username,
            groupName: roomName,
        })
    }

    addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks['messages'] = messagesCallback
        this.callbacks['new_message'] = newMessageCallback
    }

    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify(data))
        } catch {
            console.log(err.message)
        }
    }

    state() {
        return this.socketRef.readyState
    }
}

const WebSocketInstance = WebsocketService.getInstance()

export default WebSocketInstance