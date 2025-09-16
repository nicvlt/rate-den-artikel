import React from 'react'

function IconButton({ children, onClick, disabled = false, type = 'button', className = '', ...props }) {
  const baseClasses = 'rounded-full border-2 border-transparent bg-(--color-light) p-3 transition-all duration-300 hover:bg-(--color-accent) hover:text-(--color-light)'

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default IconButton
