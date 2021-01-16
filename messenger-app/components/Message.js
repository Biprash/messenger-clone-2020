import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useAuthValue } from '../store/AuthProvider'
import {HostUrl} from '../Settings'

const Message = ({messages, user}) => {
    const [{username}] = useAuthValue()
    return (
        <View>            
            {messages.map((message) => {
                {/* <Text style={{justifyContent: 'flex-end' }}>Chat</Text> */}
                return(
                <View key={message.id}>
                    {username != message.sender?
                        <View style={styles.received}>
                            <Image style={styles.avatar} source={{uri: `${HostUrl}${user.profile_pic}`}} />
                            <View style={styles.messageList}>
                                <Text style={styles.receivedMsg}>{message.message}</Text>
                                {/* <Text style={styles.receivedMsg}>How are you? dsfskaffasdlh</Text>
                                <Text style={styles.receivedMsg}>How are you?</Text> */}
                            </View>
                        </View>
                    :
                        <View style={styles.sent}>
                            <View style={styles.messageList}>
                                <Text style={styles.sentMsg}>{message.message}</Text>
                                {/* <Text style={styles.sentMsg}>How are you? dsfskafdlh</Text>
                                <Text style={styles.sentMsg}>How are you?</Text> */}
                            </View>
                        </View>
                    }
                </View>
                )
            })}
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    received: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        maxWidth: '80%',
    },
    avatar: {
        height: 35,
        width: 35,
        marginRight: 10,
        borderRadius: 20,
    },
    messageList: {
        flexDirection: 'column',
    },
    receivedMsg: {
        fontSize: 16,
        backgroundColor: '#F0F0F0',
        padding: 5,
        marginVertical: 2,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 'auto',
    },
    sent: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        maxWidth: '80%',
        marginLeft: 'auto',
    },
    sentMsg: {
        fontSize: 16,
        padding: 5,
        marginVertical: 2,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#0078FF',
        color: '#fff',
        marginLeft: 'auto',
    }
})
