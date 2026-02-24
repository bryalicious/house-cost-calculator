import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { HouseProvider } from './HouseContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HouseProvider>
      <App />
    </HouseProvider>
  </React.StrictMode>
)
