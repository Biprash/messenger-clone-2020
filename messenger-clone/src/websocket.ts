import { SOCKET_URL } from './settings'

class WebsocketService {

    static instance: WebsocketService | null = null
    socketRef: WebSocket | null = null;

    callbacks: any = {}

    static getInstance() {
        if (!WebsocketService.instance) {
            WebsocketService.instance = new WebsocketService()
        }
        return WebsocketService.instance
    }

    constructor() {
        this.socketRef = null
    }

    connect(chatUrl: string = 'admin_user1', token: string) {
        const path = `${SOCKET_URL}/ws/chat/${chatUrl}/${token}/`
        console.log(path);
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {

        }
        this.socketRef.onmessage = (e: MessageEvent) => {
            this.socketNewMessage(e.data)
        }
        this.socketRef.onerror = (e: Event) => {
            console.error((e as ErrorEvent)?.message);
        }
        this.socketRef.onclose = () => {
            console.error('Chat socket closed unexpectedly');
        }
    }

    disconnect() {
        this.socketRef?.close()
    }

    socketNewMessage(data: any) {
        const ParsedData = JSON.parse(data);
        const command = ParsedData.command
        if (Object.keys(this.callbacks).length === 0) {
            return
        }
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
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
    }

    sendMessage(data: any) {
        try {
            this.socketRef?.send(JSON.stringify(data))
        } catch (err) {
            console.log((err as Error)?.message)
        }
    }

    state() {
        return this.socketRef?.readyState
    }
}

const WebSocketInstance = WebsocketService.getInstance()

export default WebSocketInstance