import "./App.css";
import { useState, useEffect } from "react";

const distances = [2,3,4,5,6,7,8,9,10,11,12];

function App() {

  const [scores, setScores] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("puttingScores");

    if (saved) {
      setScores(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("puttingScores", JSON.stringify(scores));
  }, [scores]);

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
        </div>
      ))}
    </div>
  );
}

export default App;