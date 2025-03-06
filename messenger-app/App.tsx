import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, StatusBar as SB } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { useAuthValue } from './store/AuthProvider'
import Home from './Screen/Home';
import Chat from './Screen/Chat';
import SignIn from './Screen/SignIn';

export type RootStackParamList = {
  Home: undefined;  // Home screen doesn't require parameters
  Chat: any; // Chat screen expects an id parameter
};

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  const [{token},dispatch] = useAuthValue()
  return (
    <View style={styles.container}>
      {token ?
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
              name="Home" 
              component={Home} 
              options={{title:'Chats'}} />
            <Stack.Screen 
              name="Chat" 
              component={Chat} 
              options={{title:'Chat'}} />
          </Stack.Navigator>
        </NavigationContainer>
      :
        <SignIn />
      }
      <StatusBar style="auto"/>
    </View>
  );
}

// const STATUS_BAR = StatusBar.statusBarHeight || 24; 
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight - (SB?.currentHeight || 0);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // marginHorizontal: 10,
    // marginTop: navbarHeight,
  },
  // containers: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: DEVICE_HEIGHT - WINDOW_HEIGHT,
  // },
});
