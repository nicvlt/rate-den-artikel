import React from 'react'
import './IconButton.css'

function IconButton({ children, onClick, disabled = false, type = 'button', className = '', ...props }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`icon-button ${className}`} {...props}>
      {children}
    </button>
  )
}

export default IconButton
