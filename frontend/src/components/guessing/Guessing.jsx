import React, { useEffect, useRef, useState } from 'react'
import Button from '../../ui/Button/Button'
import IconButton from '../../ui/IconButton/IconButton'
import { ArrowRight } from 'lucide-react'
import { useExperience } from '../../contexts/ExperienceContext'

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_URL

function Guessing() {
  const { addXp, currentLevel } = useExperience()
  const [word, setWord] = useState('ㅤ') // Unicode whitespace character to avoid layout shift
  const [url, setUrl] = useState(null)
  const [id, setId] = useState(null)
  const [level, setLevel] = useState(null)
  const [textSize, setTextSize] = useState('12vw')
  const wordRef = useRef(null)
  const containerRef = useRef(null)

  const [buttonStates, setButtonStates] = useState({
    der: null,
    die: null,
    das: null,
  })
  const [isLoading, setIsLoading] = useState(false)

  const checkTextOverflow = () => {
    if (!wordRef.current || !containerRef.current) return false

    const textElement = wordRef.current
    const container = containerRef.current

    const containerStyle = window.getComputedStyle(container)
    const containerWidth = container.clientWidth - parseFloat(containerStyle.paddingLeft) - parseFloat(containerStyle.paddingRight)
    const containerHeight = container.clientHeight - parseFloat(containerStyle.paddingTop) - parseFloat(containerStyle.paddingBottom)

    return textElement.scrollWidth > containerWidth || textElement.scrollHeight > containerHeight
  }

  const adjustFontSizeIfNeeded = () => {
    if (!wordRef.current || !containerRef.current) return

    const isSmallScreen = window.innerWidth < 640
    let currentSize = isSmallScreen ? 12 : 4 // More conservative starting size
    const sizeUnit = isSmallScreen ? 'vw' : 'rem'
    const minSize = isSmallScreen ? 4 : 1.2
    const decrementSize = isSmallScreen ? 0.3 : 0.1

    // Set initial optimistic size
    wordRef.current.style.fontSize = `${currentSize}${sizeUnit}`

    requestAnimationFrame(() => {
      let iterations = 0
      const maxIterations = 30 // Prevent infinite loops

      while (checkTextOverflow() && currentSize > minSize && iterations < maxIterations) {
        currentSize = Math.max(minSize, currentSize - decrementSize)
        wordRef.current.style.fontSize = `${currentSize}${sizeUnit}`
        iterations++
      }

      setTextSize(`${currentSize}${sizeUnit}`)
    })
  }

  const fetchWord = async () => {
    try {
      const params = new URLSearchParams({ level: currentLevel })
      const url = `${BACKEND_API_URL}/words/random?${params.toString()}`
      const response = await fetch(url)
      const data = await response.json()
      setWord(data.word)
      setUrl(data.url)
      setId(data.id)
      setLevel(data.level)

      setButtonStates({
        der: null,
        die: null,
        das: null,
      })
    } catch (error) {
      setWord(`__error__Couldn't reach the server. It was inactive for too long and is turning on right now. This might take up to a few minutes. Please refresh the page.`)
      console.error('Error fetching word:', error)
    }
  }

  const checkAnswer = async (guess) => {
    setIsLoading(true)

    try {
      const params = new URLSearchParams({
        id: id,
        guess: guess,
      })
      const url = `${BACKEND_API_URL}/words/answer?${params.toString()}`
      const response = await fetch(url, { method: 'POST' })
      const data = await response.json()

      const { answer, expected, xp_awarded } = data

      const newStates = {}
      ;['der', 'die', 'das'].forEach((article) => {
        if (expected.includes(article)) {
          newStates[article] = 'success'
        } else if (article === guess && !answer) {
          newStates[article] = 'fail'
        } else {
          newStates[article] = null
        }
      })

      setButtonStates(newStates)

      addXp(xp_awarded)
    } catch (error) {
      console.error('Error checking answer:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openDefinition = () => {
    if (url) {
      window.open(url, '_blank')
    }
  }

  useEffect(() => {
    fetchWord()
  }, [])

  useEffect(() => {
    if (word !== 'ㅤ') {
      adjustFontSizeIfNeeded()
    }
  }, [word])

  useEffect(() => {
    const handleResize = () => {
      if (word !== 'ㅤ') {
        adjustFontSizeIfNeeded()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [word])

  const gameOver = Object.values(buttonStates).some((state) => state !== null)
  const handleWordClick = (value) => {
    if (isLoading || gameOver) {
      return
    }

    checkAnswer(value)
  }

  return (
    <div className='w-3/4 my-4 flex flex-col items-center gap-[10vh] sm:gap-5'>
      <div className='w-full text-center'>
        <div
          ref={containerRef}
          className='mx-auto my-3 flex items-center justify-center relative'
          style={{
            height: 'clamp(120px, 18vh, 180px)',
            width: '100%',
          }}
        >
          {!word.startsWith('__error__') && (
            <div
              ref={wordRef}
              className='font-serif underline decoration-2 decoration-transparent hover:decoration-(--color-dark) hover:cursor-pointer transition-[text-decoration-color] duration-300 ease-in text-center max-w-full px-4'
              style={{
                fontSize: textSize,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
              onClick={openDefinition}
            >
              {word}
            </div>
          )}
          {word.startsWith('__error__') && <div className='font-sans text-red-600 text-center px-4'>{word.replace('__error__', '')}</div>}
        </div>
      </div>
      <div className='flex justify-evenly w-full'>
        <Button label='DER' onClick={() => handleWordClick('der')} status={buttonStates.der} disabled={isLoading || gameOver} />
        <Button label='DIE' onClick={() => handleWordClick('die')} status={buttonStates.die} disabled={isLoading || gameOver} />
        <Button label='DAS' onClick={() => handleWordClick('das')} status={buttonStates.das} disabled={isLoading || gameOver} />
      </div>
      <div className='flex justify-center w-full'>
        <IconButton onClick={fetchWord} disabled={!gameOver || isLoading} className={`${gameOver && !isLoading ? 'opacity-100 cursor-pointer' : 'opacity-0 cursor-default'}`}>
          <ArrowRight size={16} />
        </IconButton>
      </div>
    </div>
  )
}

export default Guessing
