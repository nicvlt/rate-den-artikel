import React from 'react'

function Header() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='font-serif text-(--color-dark) text-6xl m-0'>Rate Den Artikel</div>
      <div className='font-sans text-(--color-muted) font-(--color-light) text-base w-3/4 m-0 text-center'>
        Teste dein Deutsch! Errätst du den richtigen Artikel – der, die oder das – für jedes Nomen?
      </div>
    </div>
  )
}

export default Header
