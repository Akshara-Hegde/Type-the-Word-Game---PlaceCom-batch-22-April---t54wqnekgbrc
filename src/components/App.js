import React, { useState, useEffect } from "react";
import "../styles/App.css";

const WORD_LIST = ["apple", "banana", "cherry", "grape", "orange"];

function App() {
  const [word, setWord] = useState('');
  const [flashWord, setFlashWord] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlashWord(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [word]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase() == word.toLowerCase()) {
      setResult("You won!");
    } else {
      setResult("You lost!");
    }
  };

  const handleRestartClick = () => {
    const curindex = WORD_LIST.indexOf(word);
    if (curindex < WORD_LIST.length - 1) {
      setIndex(curindex + 1);
      setWord(WORD_LIST[curindex + 1]);
      setFlashWord(true);
      setUserInput("");
      setResult(null);
      // console.log(curindex + 1, word, flashWord);
    }
  };

  return (
    <div class="mini-game-container">
      <h2 class="mini-game-title">Mini Game</h2>
      {flashWord && <p class="mini-game-word">{word}</p>}
      {!flashWord && (
        <form class="mini-game-form" onSubmit={handleFormSubmit}>
          <input
            class="mini-game-input"
            type="text"
            value={userInput}
            onChange={handleInputChange}
          />
          {!result && (<button class="mini-game-button" type="submit">
            Check Answer
          </button>)}
        </form>
      )}
      {result && (
        <>
          <p class="mini-game-result">{result}</p>
          <button class="mini-game-restart-button" onClick={handleRestartClick}>
            Restart
          </button>
        </>
      )}
    </div>
  );
}

export default App;
