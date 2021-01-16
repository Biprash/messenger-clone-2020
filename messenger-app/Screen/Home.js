import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useAuthValue } from '../store/AuthProvider'
import axios from 'axios'
import { HostUrl } from '../Settings'

const Home = ({ navigation }) => {
    const [{ token }] = useAuthValue()
    const [friends, setFriends] = useState()

    useEffect(() => {
        // console.log(props, 'effect')
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .get(`${HostUrl}/chat/api/contact/`)
            .then(res => {
                // console.log(res.data.friends)
                setFriends(res.data.friends)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])
    
    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <Image style={styles.profile} source={{uri: "https://scontent.fktm3-1.fna.fbcdn.net/v/t1.0-1/p100x100/74673267_2478449045578532_2675973614221656064_o.jpg?_nc_cat=100&ccb=2&_nc_sid=7206a8&_nc_ohc=vawuzGb4E5wAX9q9Xm0&_nc_ad=z-m&_nc_cid=5011&_nc_ht=scontent.fktm3-1.fna&tp=6&oh=6e0f7a0f8a6a31e16b06c45da6f676cc&oe=601172B7"}} />
          ),
          headerRight: () => (
              <View style={{flexDirection: 'row', marginRight: 15}}>
                  <TouchableOpacity style={styles.iconHolder} >
                    <FontAwesome style={styles.icon} name="camera" size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconHolder}>
                    <MaterialIcons style={styles.icon} name="mode-edit" size={20} color="black" />
                  </TouchableOpacity>
              </View>
          ),
        });
      }, [navigation]);

    return (
        <ScrollView style={{paddingHorizontal: 15, backgroundColor: '#fff'}}>
            <View style={styles.search_bar}>
                <MaterialIcons style={{marginRight: 10}} name="search" size={22} color="gray" />
                <TextInput style={styles.search} placeholder="Search" />
            </View>
            {friends?
                <>
                {friends.map((friend, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Chat', friend)}>
                            <View style={styles.chat_item}>
                                <Image style={styles.avatar} source={{uri:`${HostUrl}${friend.profile_pic}`}} />
                                <View style={styles.chat_area}>
                                    <Text style={styles.chat_username, styles.text_title}>{friend.username}</Text>
                                    <View style={styles.chat_messages}>
                                        <Text style={styles.chat_message, styles.text}>You: Hlo K gardai hunu huncha</Text>
                                        <Text style={styles.chat_timesplit, styles.text}> . </Text>
                                        <Text style={styles.chat_time, styles.text}>12:00 PM</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
                </>
            :
                <Text>No Friends to show</Text>
            }
            
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    profile: {
        marginLeft: 15,
        height: 45,
        width: 45,
        borderRadius: 40,
    },
    iconHolder: {
        padding: 5,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        margin: 2
    },
    icon: {
        padding: 5,
    },

    search_bar : {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
    },
    search : {
        fontSize: 18,
    },
    chat_item : {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center'
    },
    text_title : {
        fontSize: 18,
        color: '#303030',
    },
    text : {
        fontSize: 16,
        color: '#505050',
    },
    avatar : {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10
    },
    chat_area : {
        flexDirection: 'column',
    },
    chat_messages : {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden'
    },
})
