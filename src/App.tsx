import { generateColors } from "./utils";

import { useState, useEffect } from "react";
import { getRandomColor } from "./utils";

const App = () => {
  const [targetColor, setTargetColor] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("colorGameHighScore");
    return saved ? parseInt(saved) : 0;
  });
  const [lives, setLives] = useState(3);
  const [gameStatus, setGameStatus] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const startNewGame = () => {
    const newTargetColor = getRandomColor();
    setTargetColor(newTargetColor);
    setColors(generateColors(newTargetColor));
    setGameStatus("");
    setIsCorrect(null);
    setLives(3);
    setScore(0);
    setIsGameOver(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const updateHighScore = (newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem("colorGameHighScore", newScore.toString());
    }
  };

  const handleGuess = (color: string) => {
    if (isGameOver) return;

    if (color === targetColor) {
      const newScore = score + 1;
      setScore(newScore);
      updateHighScore(newScore);
      setGameStatus("Correct! 🎉");
      setIsCorrect(true);
      setTimeout(() => {
        const newTargetColor = getRandomColor();
        setTargetColor(newTargetColor);
        setColors(generateColors(newTargetColor));
        setGameStatus("");
        setIsCorrect(null);
      }, 1500);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setGameStatus("Wrong! Try again");
      setIsCorrect(false);

      if (newLives === 0) {
        setGameStatus("Game Over you noob! 🎮");
        setIsGameOver(true);
        updateHighScore(score);
      }

      setTimeout(() => {
        setGameStatus("");
      }, 1500);
    }
  };

  return (
    <div className="game-container">
      <div className="game-content">
        <h1 className="game-title">Color Guessing Game</h1>

        <div className="stats-container">
          <div data-testid="score" className="stat-item">
            Score: {score}
          </div>
          <div className="stat-item">
            High Score: {highScore}
          </div>
          <div className={`stat-item ${lives === 1 ? 'low-lives' : ''}`}>
            Lives: {"❤️".repeat(lives)}
          </div>
        </div>

        <div data-testid="gameInstructions" className="game-instructions">
          {isGameOver ? "Game Over! Click New Game to play again" : "Guess the correct color!"}
        </div>

        <div
          data-testid="colorBox"
          className="color-box"
          style={{ backgroundColor: targetColor, opacity: isGameOver ? 0.7 : 1 }}
        />

        <div
          data-testid="gameStatus"
          className={`game-status ${isCorrect === true ? 'correct' : isCorrect === false ? 'wrong' : ''}`}
        >
          {gameStatus}
        </div>

        <div className={`color-grid ${isGameOver ? 'game-over' : ''}`}>
          {colors.map((color, index) => (
            <button
              key={index}
              data-testid="colorOption"
              onClick={() => handleGuess(color)}
              className="color-option"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <button
          data-testid="newGameButton"
          onClick={startNewGame}
          className="new-game-btn"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default App;
