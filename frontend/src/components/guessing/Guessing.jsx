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

  const [buttonStates, setButtonStates] = useState({
    der: null,
    die: null,
    das: null,
  })
  const [isLoading, setIsLoading] = useState(false)

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
      console.log(url)
      const response = await fetch(url, { method: 'POST' })
      const data = await response.json()

      const { answer, expected, xp_awarded } = data

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

  const gameOver = Object.values(buttonStates).some((state) => state !== null)
  const handleWordClick = (value) => {
    if (isLoading || gameOver) {
      return
    }

    checkAnswer(value)
  }

  return (
    <div className='w-3/4 my-4 flex flex-col items-center gap-5'>
      <div className='w-full text-center'>
        <div
          className='font-serif text-5xl w-full my-3 underline decoration-2 decoration-transparent hover:decoration-(--color-dark) hover:cursor-pointer transition-all duration-300 ease-in text-center'
          onClick={openDefinition}
        >
          {word}
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
