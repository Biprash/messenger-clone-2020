import React, { createContext, useContext, useReducer } from 'react'
import { AuthReducer, AuthState } from './reducers/auth';
import { AuthAction } from './actions/ActionsTypes';

// export const AuthContext = createContext()
export const AuthContext = createContext<[AuthState, React.Dispatch<AuthAction>] | undefined>(undefined)

// Define the type for the `AuthProvider` props
interface AuthProviderProps {
    reducer: AuthReducer;
    initialState: AuthState;
    children: React.ReactNode;
  }

export const AuthProvider: React.FC<AuthProviderProps> = ({ reducer, initialState, children }) => (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </AuthContext.Provider>
)

// export const useAuthValue = () => useContext(AuthContext)
// The `useAuthValue` hook with error handling for undefined context
export const useAuthValue = (): [AuthState, React.Dispatch<AuthAction>] => {
    const context = useContext(AuthContext);
    
    if (!context) {
      throw new Error('useAuthValue must be used within an AuthProvider');
    }
    
    return context;
};