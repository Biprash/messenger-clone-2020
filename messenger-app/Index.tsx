import { registerRootComponent } from 'expo';
import React from 'react'
import App from './App';
import reducer, { initialState } from './store/reducers/auth';
import { AuthProvider } from './store/AuthProvider';

const Index = () => {
    return (
        <AuthProvider initialState={initialState} reducer={reducer}>
            <App />
        </AuthProvider>
    )
}

registerRootComponent(Index);
