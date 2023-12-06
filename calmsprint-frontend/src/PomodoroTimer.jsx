import React, { useState, useEffect } from 'react';
import $ from 'jquery';

export default (props) => {
  const [time, setTime] = useState(25 * 60); // Tempo inicial em segundos
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [running]);

  const startTimer = () => {
    $('#btn-start').hide();
    $('#btn-pause').show();
    $('#btn-reset').show();
    setRunning(true);
  };

  const pauseTimer = () => {
    $('#btn-start').show();
    $('#btn-start').hide();
    $('#btn-pause').show();
    $('#btn-reset').show();
    setRunning(false);
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setRunning(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (

    <div className="container">
      {/* <div className="section-container">
        <button id="focus" className={`btn btn-timer ${active === "focus" ? "btn-focus" : ""}`} onClick={() => handleButtonClick("focus")}>
          Focus
        </button>
        <button id="shortbreak" className={`btn btn-shortbreak ${active === "shortbreak" ? "btn-focus" : ""}`} onClick={() => handleButtonClick("shortbreak")}>
          Short Break
        </button>
        <button id="longbreak" className={`btn btn-longbreak ${active === "longbreak" ? "btn-focus" : ""}`} onClick={() => handleButtonClick("longbreak")}>
          Long Break
        </button>
      </div> */}
      <div className="time-btn-container">
        <span id="time">{formatTime()}</span>
        <div className="btn-container">
          {/* Adapte os eventos onClick para chamar as funções correspondentes */}
          <button id="btn-start" onClick={startTimer}>
            Start
          </button>
          <button id="btn-pause" onClick={pauseTimer}>
            Pause
          </button>
          <button id="btn-reset" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </div>

  );
};