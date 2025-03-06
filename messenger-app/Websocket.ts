import { SOCKET_URL } from './Settings'

class WebsocketService {

    static instance: WebsocketService | null = null
    socketRef: WebSocket | null = null;

    callbacks: any = {}

    static getInstance() {
        if(!WebsocketService.instance) {
            WebsocketService.instance = new WebsocketService()
        }
        return WebsocketService.instance
    }
    
    constructor() {
        this.socketRef = null
    }

    connect(chatUrl: string, token: string) {
        const path = `${SOCKET_URL}/ws/chat/${chatUrl}/${token}/`
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
            console.error('Chat socket closed unexpectly')
        }
    }

    disconnect() {
        this.socketRef?.close()
    }

    socketNewMessage(data: any) {
        const ParsedData = JSON.parse(data)
        const command = ParsedData.command

        if (command === 'messages') {
            this.callbacks[command](ParsedData.messages)
        }
        if (command === 'new_message') {
            this.callbacks[command](ParsedData)
        }
    }

    fetchMessages(username: string, roomName: string) {
        this.sendMessage({
            command: 'fetch_messages',
            username: username,
            groupName: roomName,
        })
    }

    newChatMessage(message: string, username: string, roomName: string) {
        this.sendMessage({
            command: 'new_message',
            message: message,
            from: username,
            groupName: roomName,
        })
    }

    addCallbacks(messagesCallback: (message: any) => void, newMessageCallback: (message: any) => void) {
        this.callbacks['messages'] = messagesCallback
        this.callbacks['new_message'] = newMessageCallback
    }

    sendMessage(data: any) {
        try {
            this.socketRef?.send(JSON.stringify(data))
        } catch (err) {
            console.log((err as Error).message)
        }
    }

    state() {
        return this.socketRef?.readyState
    }
}

const WebSocketInstance = WebsocketService.getInstance()

export default WebSocketInstance