import "./App.css";
import { useState, useEffect } from "react";

const distances = [2,3,4,5,6,7,8,9,10,11,12];

function App() {

  const [scores, setScores] = useState({});
  const [lastScores, setLastScores] = useState({});

  useEffect(() => {
    const savedScores = localStorage.getItem("puttingScores");
    const savedLastScores = localStorage.getItem("lastPuttingScores");

    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }

    if (savedLastScores) {
      setLastScores(JSON.parse(savedLastScores));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("puttingScores", JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem("lastPuttingScores", JSON.stringify(lastScores));
  }, [lastScores]);

  const increase = (distance) => {
    setScores((prev) => ({
      ...prev,
      [distance]: Math.min((prev[distance] || 0) + 1, 10)
    }));
  };

  const decrease = (distance) => {
    setScores((prev) => ({
      ...prev,
      [distance]: Math.max((prev[distance] || 0) - 1, 0)
    }));
  };

  const saveResult = (distance) => {
    setLastScores((prev) => ({
      ...prev,
      [distance]: scores[distance] || 0
    }));

    setScores((prev) => ({
      ...prev,
      [distance]: 0
    }));
  };

  return (
    <div className="app">
      <h1>Disc Golf Putting Practice</h1>

      {distances.map((distance) => (
        <div className="row" key={distance}>

          <h2>{distance}m</h2>

          <div className="controls">
            <button onClick={() => decrease(distance)}>-</button>

            <span>{scores[distance] || 0} / 10</span>

            <button onClick={() => increase(distance)}>+</button>
          </div>

          <button
            className="saveButton"
            onClick={() => saveResult(distance)}
          >
            Save Result
          </button>

          <p className="lastScore">
            Last: {lastScores[distance] ?? "-"} / 10
          </p>

        </div>
      ))}
    </div>
  );
}

export default App;