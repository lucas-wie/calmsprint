import React, { useState, useEffect } from "react";
import "./Styles/PomodoroTimer.css";

const PomodoroTimer = () => {
  const [active, setActive] = useState("focus");
  const [count, setCount] = useState(59);
  const [minCount, setMinCount] = useState(24);
  const [paused, setPaused] = useState(true);
  const [setIntervalId, setSetIntervalId] = useState(null);
  const [timeContent, setTimeContent] = useState(`${minCount + 1}:00`);

  useEffect(() => {
    setTimeContent(`${minCount + 1}:00`);
  }, [minCount]);

  const appendZero = (value) => {
    value = value < 10 ? `0${value}` : value;
    return value;
  };

  const resetTime = () => {
    pauseTimer();
    setPaused(true);
    setActive("focus");
    setMinCount(24);
    setCount(59);
    setTimeContent(`${minCount + 1}:00`);
  };

  const removeFocus = () => {
    // Implementação da função removeFocus
  };

  const handleButtonClick = (type) => {
    // Implementação da função handleButtonClick
  };

  const pauseTimer = () => {
    clearInterval(setIntervalId);
    setPaused(true);
  };

  const startTimer = () => {
    // Implementação da função startTimer
  };

  return (
    <div className="container">
      <div className="section-container">
        <button id="focus" className={`btn btn-timer ${active === "focus" ? "btn-focus" : ""}`} onClick={() => handleButtonClick("focus")}>
          Focus
        </button>
        <button id="shortbreak" className={`btn btn-shortbreak ${active === "shortbreak" ? "btn-focus" : ""}`} onClick={() => handleButtonClick("shortbreak")}>
          Short Break
        </button>
        <button id="longbreak" className={`btn btn-longbreak ${active === "longbreak" ? "btn-focus" : ""}`} onClick={() => handleButtonClick("longbreak")}>
          Long Break
        </button>
      </div>
      <div className="time-btn-container">
        <span id="time">{timeContent}</span>
        <div className="btn-container">
          {/* Adapte os eventos onClick para chamar as funções correspondentes */}
          <button id="btn-start" className={`show ${paused ? "" : "hide"}`} onClick={startTimer}>
            Start
          </button>
          <button id="btn-pause" className={`hide ${paused ? "show" : ""}`} onClick={pauseTimer}>
            Pause
          </button>
          <button id="btn-reset" className={`hide ${paused ? "show" : ""}`} onClick={resetTime}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
