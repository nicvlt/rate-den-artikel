import React, { useEffect, useRef, useState } from 'react'
import './Guessing.css'
import Button from '../../ui/Button/Button'
import IconButton from '../../ui/IconButton/IconButton'
import { ArrowRight } from 'lucide-react'

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_URL
const LEVEL = 'A1' // Currently hardcoded, can be dynamic later

function Guessing() {
  const [word, setWord] = useState('ㅤ') // Unicode whitespace character to avoid layout shift
  const [url, setUrl] = useState(null)
  const [id, setId] = useState(null)
  const [level, setLevel] = useState(null)

  const [buttonStates, setButtonStates] = useState({
    der: null,
    die: null,
    das: null,
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchWord = async () => {
    try {
      const params = new URLSearchParams({ level: LEVEL })
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
      const url = `${BACKEND_API_URL}/words/check?${params.toString()}`
      console.log(url)
      const response = await fetch(url, { method: 'POST' })
      const data = await response.json()

      const { answer, expected } = data

      const newStates = {}
      ;['der', 'die', 'das'].forEach((article) => {
        if (article === expected) {
          newStates[article] = 'success'
        } else if (article === guess && !answer) {
          newStates[article] = 'fail'
        } else {
          newStates[article] = null
        }
      })

      setButtonStates(newStates)

      // TODO - Handle score update here
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

  const gameOver = Object.values(buttonStates).some((state) => state !== null)
  const handleWordClick = (value) => {
    if (isLoading || gameOver) {
      return
    }

    checkAnswer(value)
  }

  return (
    <div className='container'>
      <div>
        <div className='word' onClick={openDefinition}>
          {word}
        </div>
      </div>
      <div className='button-group'>
        <Button label='DER' onClick={() => handleWordClick('der')} status={buttonStates.der} disabled={isLoading || gameOver} />
        <Button label='DIE' onClick={() => handleWordClick('die')} status={buttonStates.die} disabled={isLoading || gameOver} />
        <Button label='DAS' onClick={() => handleWordClick('das')} status={buttonStates.das} disabled={isLoading || gameOver} />
      </div>
      <div className='next-button-container'>
        <IconButton onClick={fetchWord} className={`${gameOver && !isLoading ? 'opacity-100' : 'opacity-0'}`}>
          <ArrowRight size={16} disabled={!gameOver || isLoading} />
        </IconButton>
      </div>
    </div>
  )
}

export default Guessing
