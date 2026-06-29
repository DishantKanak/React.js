import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Enable animations after initial render for faster perceived load
if (document.documentElement) {
  document.documentElement.classList.remove('initial-load')
}
