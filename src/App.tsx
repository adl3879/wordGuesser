import React, { useState } from "react";
import { WORDS } from "./words";
import { scrambleWord } from "./utils/scrambleWord";
import "./App.css"

const App: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<string>(WORDS[0]);
  const [scrambledWord, setScrambledWord] = useState<string>(scrambleWord(WORDS[0]));
  const [userGuess, setUserGuess] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [hint, setHint] = useState<string>("");

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("");
    if (userGuess.toLowerCase() === currentWord) {
      setFeedback("Correct! 🎉");
      setScore((prevScore) => prevScore + 1);
      nextWord();
    } else {
      setFeedback("Incorrect. Try again! ❌");
    }
    setUserGuess("");
  };

  const handleInputChange = () => {
    setFeedback("");
  } 

  const nextWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    const newWord = WORDS[randomIndex];
    setCurrentWord(newWord);
    setScrambledWord(scrambleWord(newWord));
    setHint("");
  };

  const showHint = () => {
    setHint(`Hint: The word starts with "${currentWord[0]}"`);
  };

  return (
    <div className="App">
      <h1 className="title">Scrambled Word Guesser</h1>
      <p>Score: {score}</p>
      <p>Scrambled Word:
        <br /> <span className="scrWord">{scrambledWord}</span> </p>
      <form onSubmit={handleGuess} onChange={handleInputChange} className="form">
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Your guess"
          className="input"
        />
        <button type="submit" className="btn">Submit</button>
      </form>
      <button onClick={showHint}>Get Hint</button>
      <p>{hint}</p>
      <p>{feedback}</p>
    </div>
  );
};

export default App;