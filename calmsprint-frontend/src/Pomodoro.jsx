import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Styles/Pomodoro.css";

export default function Pomodoro() {
  const [active, setActive] = useState("focus");
  const [count, setCount] = useState(59);
  const [minCount, setMinCount] = useState(24);
  const [paused, setPaused] = useState(true);
  const [setIntervalId, setSetIntervalId] = useState(null);

  useEffect(() => {
    const timeElement = document.getElementById("time");
    timeElement.textContent = `${minCount + 1}:00`;
  }, [minCount]);

  const appendZero = (value) => {
    value = value < 10 ? `0${value}` : value;
    return value;
  };

  const resetTime = () => {
    pauseTimer();
    setActive("focus");
    setMinCount(24);
    setCount(59);
    const timeElement = document.getElementById("time");
    timeElement.textContent = `${minCount + 1}:00`;
  };

  const removeFocus = () => {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn) => {
      btn.classList.remove("btn-focus");
    });
  };

  const handleButtonClick = (type) => {
    setActive(type);
    removeFocus();
    const button = document.getElementById(type);
    button.classList.add("btn-focus");
    resetTime();
    switch (type) {
      case "focus":
        setMinCount(24);
        setCount(59);
        break;
      case "shortbreak":
        setMinCount(4);
        setCount(59);
        break;
      case "longbreak":
        setMinCount(14);
        setCount(59);
        break;
      default:
        break;
    }
    const timeElement = document.getElementById("time");
    timeElement.textContent = `${type === "focus" ? minCount + 1 : appendZero(minCount + 1)}:00`;
  };

  const pauseTimer = () => {
    setPaused(true);
    clearInterval(setIntervalId);
  };

  const startTimer = () => {
    if (paused) {
      setPaused(false);
      const timeElement = document.getElementById("time");
      timeElement.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      const id = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
        timeElement.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        if (count === 0) {
          if (minCount !== 0) {
            setMinCount((prevMinCount) => prevMinCount - 1);
            setCount(60);
          } else {
            clearInterval(id);
            setPaused(true);
          }
        }
      }, 1000);
      setSetIntervalId(id);
    }
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
        <span id="time"></span>
        <div className="btn-container">
          <button id="btn-start" className={`show ${paused ? "" : "hide"}`} onClick={startTimer}>
            Start
          </button>
          <button id="btn-pause" className={`hide ${paused ? "show" : ""}`} onClick={pauseTimer}>
            Pause
          </button>
          <button id="btn-reset" className={`hide ${paused ? "show" : ""}`} onClick={resetTime}>
            <FontAwesomeIcon icon="fa-solid fa-rotate-right" />
          </button>
        </div>
      </div>
    </div>
  );
}
