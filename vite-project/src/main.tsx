import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/ThemeContext.tsx'
import { AuthProvider } from './components/AuthContext.tsx'
import store from "./store/store.ts"
import {Provider} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider>
    <ThemeProvider>
    <App />
    </ThemeProvider>
    </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
