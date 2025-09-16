import React, { useState } from 'react'

function Button({ label, onClick, status = null, disabled = false }) {
  const baseClasses =
    'rounded-md border-2 px-6 py-3 text-base font-(--color-light) font-sans cursor-pointer transition-all duration-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:pointer-events-none'

  const getStatusClasses = () => {
    switch (status) {
      case 'success':
        return 'bg-(--color-success) border-(--color-success) text-(--color-light)'
      case 'fail':
        return 'bg-(--color-fail) border-(--color-fail) text-(--color-light)'
      default:
        return 'border-(--color-accent) bg-(--color-light) text-(--color-dark) hover:bg-(--color-accent) hover:text-(--color-light)'
    }
  }

  const className = `${baseClasses} ${getStatusClasses()}`

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}

export default Button
