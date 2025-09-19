import React, { useState, useEffect } from 'react'
import { useExperience } from '../../contexts/ExperienceContext'

function ProgressBar() {
  const { xp, currentLevel, nextLevel, lastAction } = useExperience()
  const [showNotification, setShowNotification] = useState(false)
  const [notificationText, setNotificationText] = useState('')

  // Show notification when lastAction changes
  useEffect(() => {
    if (lastAction) {
      setNotificationText(lastAction)
      setShowNotification(true)

      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [lastAction])

  return (
    <div id='progress-bar' className='w-full flex flex-col gap-1 items-center'>
      <div id='progress-bar.text' className='w-full flex justify-between text-(--color-dark) font-serif text-sm relative px-3 sm:px-0'>
        <div>{currentLevel}</div>
        <div className='relative'>
          <div
            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-(--color-accent) text-white text-xs rounded shadow-lg transition-all duration-300 whitespace-nowrap ${
              showNotification ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            {notificationText}
            <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-(--color-accent)'></div>
          </div>
          {xp}/1000 xp
        </div>
        <div>{nextLevel}</div>
      </div>
      <div id='progress-bar.container' className='w-full h-[8px] relative bg-(--color-muted-light) sm:rounded-xs'>
        <div id='progress-bar.fill' className='h-full bg-(--color-accent) absolute top-0 left-0 sm:rounded-xs transition-all duration-500' style={{ width: `${(xp / 1000) * 100}%` }}></div>
      </div>
    </div>
  )
}

export default ProgressBar
