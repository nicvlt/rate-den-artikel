import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Mobile viewport height fix for older browsers
function setViewportHeight() {
  // Check if the browser supports dvh (dynamic viewport height)
  const supportsDvh = CSS.supports('height', '100dvh')

  if (!supportsDvh) {
    // Calculate the actual viewport height
    const vh = window.innerHeight * 0.01
    // Set the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
}

// Set the viewport height on load
setViewportHeight()

// Update viewport height on resize and orientation change
window.addEventListener('resize', setViewportHeight)
window.addEventListener('orientationchange', () => {
  // Small delay to ensure orientation change is complete
  setTimeout(setViewportHeight, 100)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
