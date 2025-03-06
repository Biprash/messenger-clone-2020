import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import { AuthProvider } from './store/AuthProvider'
import reducer, { initialState } from './store/reducers/auth'
import './index.css';

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider initialState={initialState} reducer={reducer}>
        <App />
      </AuthProvider>
    </StrictMode>,
  )
} else console.log('No Root Element Found!!!')
