import React, { createContext, useContext, useReducer } from 'react'

const EXPERIENCE_CONFIG = {
  XP_THRESHOLD: 1000,
  LEVELS: ['A1', 'A2', 'B1'],
  MAX_XP_AT_MAX_LEVEL: 1000,
}

const ExperienceContext = createContext()

const calculateLevelProgression = (currentXp, currentLevelIndex, xpChange) => {
  let totalXp = currentXp + xpChange
  let newLevelIndex = currentLevelIndex
  let actionStatus = ''

  while (totalXp < 0 && newLevelIndex > 0) {
    newLevelIndex--
    totalXp = EXPERIENCE_CONFIG.XP_THRESHOLD + totalXp // Add the negative XP to threshold
    actionStatus = `Leveled down to ${EXPERIENCE_CONFIG.LEVELS[newLevelIndex]}`
  }

  if (totalXp < 0 && newLevelIndex === 0) {
    totalXp = 0
  }

  if (totalXp >= EXPERIENCE_CONFIG.XP_THRESHOLD && newLevelIndex < EXPERIENCE_CONFIG.LEVELS.length - 1) {
    newLevelIndex++
    totalXp = 0 // Reset XP to 0 on level up
    actionStatus = `Leveled up to ${EXPERIENCE_CONFIG.LEVELS[newLevelIndex]}!`
  }

  if (newLevelIndex === EXPERIENCE_CONFIG.LEVELS.length - 1 && totalXp >= EXPERIENCE_CONFIG.XP_THRESHOLD) {
    totalXp = EXPERIENCE_CONFIG.MAX_XP_AT_MAX_LEVEL
  }

  return { totalXp, newLevelIndex, actionStatus }
}

const formatActionMessage = (xpChange, levelProgression) => {
  const { newLevelIndex, actionStatus } = levelProgression

  if (actionStatus) {
    return actionStatus
  }

  let message = xpChange < 0 ? `${xpChange} XP` : `+${xpChange} XP`

  if (newLevelIndex === EXPERIENCE_CONFIG.LEVELS.length - 1 && levelProgression.totalXp >= EXPERIENCE_CONFIG.XP_THRESHOLD) {
    message += ' (Max level)'
  }

  return message
}

const experienceReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_XP': {
      const levelProgression = calculateLevelProgression(state.xp, state.levelIndex, action.payload)
      const actionMessage = formatActionMessage(action.payload, levelProgression)

      return {
        ...state,
        xp: levelProgression.totalXp,
        levelIndex: levelProgression.newLevelIndex,
        lastAction: actionMessage,
      }
    }
    case 'RESET': {
      return {
        xp: 0,
        levelIndex: 0,
        lastAction: 'Reset to A1',
      }
    }
    default:
      return state
  }
}

const initialState = {
  xp: 0,
  levelIndex: 0,
  lastAction: '',
}

export const useExperience = () => {
  const context = useContext(ExperienceContext)
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider')
  }
  return context
}

export const ExperienceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(experienceReducer, initialState)

  const addXp = (xpAwarded) => {
    dispatch({ type: 'ADD_XP', payload: xpAwarded })
  }

  const resetXp = () => {
    dispatch({ type: 'RESET' })
  }

  const getCurrentLevel = () => {
    return EXPERIENCE_CONFIG.LEVELS[state.levelIndex]
  }

  const getNextLevel = () => {
    return state.levelIndex < EXPERIENCE_CONFIG.LEVELS.length - 1 ? EXPERIENCE_CONFIG.LEVELS[state.levelIndex + 1] : EXPERIENCE_CONFIG.LEVELS[state.levelIndex]
  }

  const value = {
    xp: state.xp,
    addXp,
    resetXp,
    currentLevel: getCurrentLevel(),
    nextLevel: getNextLevel(),
    lastAction: state.lastAction,
  }

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}
