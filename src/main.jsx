import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { IdiomaProvider } from './context/IdiomaContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <IdiomaProvider>
        <App />
      </IdiomaProvider>
    </AuthProvider>
  </StrictMode>,
)