import React, { useEffect, useRef, useState } from 'react';
import './Guessing.css';
import Button from '../../ui/Button';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_URL;
const LEVEL = 'A1'; // Currently hardcoded, can be dynamic later

function Guessing() {
  const [word, setWord] = useState('ㅤ'); // Unicode whitespace character to avoid layout shift
  const [url, setUrl] = useState(null);
  const [id, setId] = useState(null);
  const [level, setLevel] = useState(null);

  const [statusRes, setStatusRes] = useState(null); // null, 'success', 'fail'
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(null); // which label was clicked

  useEffect(() => {
    setStatusRes(null);
    setSelected(null);
    setDisabled(false);

    const fetchWord = async () => {
      try {
        const params = new URLSearchParams({ level: LEVEL });
        const url = `${BACKEND_API_URL}/words/random?${params.toString()}`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        setWord(data.word);
        setUrl(data.url);
        setId(data.id);
        setLevel(data.level);
      } catch (error) {
        console.error('Error fetching word:', error);
      }
    };

    fetchWord();
  }, []);

  const handleWordClick = (value) => {
    setSelected(value);
    setDisabled(true);

    const checkAnswer = async () => {
      try {
        const params = new URLSearchParams({
          word_id: id,
          word: word,
          guessed_article: value,
        });
        const url = `${BACKEND_API_URL}/words/check?${params.toString()}`;
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json();

        setStatusRes(data.correct ? 'success' : 'fail');
      } catch (error) {
        console.error('Error checking answer:', error);
      }
    };

    checkAnswer();
  };

  return (
    <div className="container">
      <div>
        <div className="word">{word}</div>
      </div>
      <div className="button-group">
        <Button label="der" onClick={() => handleWordClick('der')} status={selected === 'der' ? statusRes : null} disabled={disabled} />
        <Button label="die" onClick={() => handleWordClick('die')} status={selected === 'die' ? statusRes : null} disabled={disabled} />
        <Button label="das" onClick={() => handleWordClick('das')} status={selected === 'das' ? statusRes : null} disabled={disabled} />
      </div>
    </div>
  );
}

export default Guessing;
