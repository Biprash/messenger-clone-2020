import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useAuthValue } from '../store/AuthProvider'
import { authLogin } from '../store/actions/Auth'

const SignIn = () => {
    const [state, dispatch] = useAuthValue()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => { 
        authLogin(dispatch, username, password);
        setUsername('')
        setPassword('')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Connect with Friends</Text>
            {/* <Text style={styles.label}>Username</Text> */}
            <TextInput placeholder="Username" value={username} onChangeText={text => setUsername(text)} autoFocus={true} textContentType="username" autoCapitalize="none" style={styles.input} />
            {/* <Text style={styles.label}>Password</Text> */}
            <TextInput placeholder="Password" value={password} onChangeText={text => setPassword(text)} autoComplete="off" secureTextEntry={true} textContentType="password" style={styles.input} />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.btnText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    heading: {
        fontSize: 64,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
    },
    input: {
        // borderWidth: 1,
        backgroundColor: '#F0F0F0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 18,
        borderRadius: 40,
        minWidth: '80%',
        marginVertical: 15,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#0078FF',
        marginTop: 10,
        borderRadius: 40,
        minWidth: '40%',
    },
    btnText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    }
})
