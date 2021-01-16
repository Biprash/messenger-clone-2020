import { registerRootComponent } from 'expo';
import React from 'react'
import App from './App';
import { AuthProvider } from './store/AuthProvider'
import reducer, { initialState } from './store/reducers/Auth'

const Index = () => {
    return (
        <AuthProvider initialState={initialState} reducer={reducer}>
            <App />
        </AuthProvider>
    )
}

registerRootComponent(Index);
