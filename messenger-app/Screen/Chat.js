import React, { useLayoutEffect, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Image, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Message from '../components/Message';
import { useAuthValue } from '../store/AuthProvider'
import { HostUrl, SocketUrl } from '../Settings'
import WebSocketInstance from '../Websocket'

const Chat = ({ route, navigation }) => {
    const [{username, token}] = useAuthValue()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [send, setSend] = useState(false)
    const user = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
            <View style={{alignItems: 'center', flexDirection: 'row',marginLeft:5}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Image style={styles.profile} source={{uri: `${HostUrl}${user.profile_pic}`}} />
            </View>
            ),
            headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 15}}>
                    <TouchableOpacity style={styles.iconHolder} >
                    <FontAwesome style={styles.navIcon} name="phone" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconHolder}>
                    <Ionicons style={styles.navIcon} name="videocam" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconHolder}>
                    <MaterialIcons style={styles.navIcon} name="info" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),
            title: user.username,
        });
    }, [navigation]);

    const initialiseChat = () => {
        waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(setTheMessages, addMessage)
            console.log('yeskj')
            WebSocketInstance.fetchMessage(
                username,
                user.group_name
            )
        })
        WebSocketInstance.connect(user.group_name,token)
    }
    
    const waitForSocketConnection = (callback) => {
        setTimeout(
            () => {
                console.log('lkfjsa');
                if (WebSocketInstance.state() === 1) {
                    console.log('Connection made');
                    callback();
                    return
                } else {
                    console.log('Waiting for connection');
                    waitForSocketConnection(callback)
                }
            }, 100
        )
    }

    const setTheMessages = (messages) => {
        setMessages([...messages.reverse()])
    }
    const addMessage = (message) => {
        setMessages(messages => [...messages,message])
        return
    }

    const handleSubmit = () => {
        WebSocketInstance.newChatMessage(message.trim(), username, user.group_name)
        setMessage('')
    }

    useEffect(() => {
    // navigation.setOptions({ title: 'Updated!' })
        initialiseChat()
        // return () => {
        //     cleanup
        // }
    }, [])

    return (
        <View style={{height: '100%',backgroundColor: '#fff'}}>
            <ScrollView  contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', flexDirection: 'column', paddingBottom: 10 }} style={styles.container}>
                {messages?
                <Message user={user} messages={messages} />
                :null}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.footerBody}>
                    <TouchableOpacity>
                        <FontAwesome style={styles.icon} name="camera" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons style={styles.icon} name="image" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome style={styles.icon} name="microphone" size={24} />
                    </TouchableOpacity>

                    {/* <TouchableOpacity>
                        <MaterialIcons style={styles.icon} name="navigate-next" size={24} />
                    </TouchableOpacity> */}

                    <View style={styles.inputBody}>
                        <TextInput placeholder="Aa" value={message} onBlur={() => setSend(false)} onFocus={() => setSend(true)} onChangeText={text => setMessage(text)} multiline={true} style={styles.input} />
                        <TouchableOpacity>
                            <FontAwesome5 style={styles.icon} name="smile" size={24} />
                        </TouchableOpacity>
                    </View>
                    {send?
                    <TouchableOpacity onPress={handleSubmit}>
                        <Ionicons style={styles.icon} name="ios-send" size={24} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <AntDesign style={styles.icon} name="like1" size={24} />
                    </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    profile: {
        height: 40,
        width: 40,
        borderRadius: 40,
    },
    iconHolder: {
        padding: 5,
        margin: 2,
    },
    navIcon: {
        color: '#0078FF',
    },

    container : {
        marginHorizontal: 10,
    },
    footer: {
        width: '100%',
        bottom: 0,
        borderTopWidth: 1,
        borderColor: '#D3D3D3',
    },
    footerBody :{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 10,
    },
    icon : {
        color: '#0078FF',
        padding: 5,
        paddingHorizontal: 10,
    },
    inputBody : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
    },
    input: {
        flex: 1,
        fontSize: 18,
        paddingHorizontal: 15,
        paddingVertical: 5,
    }
})
