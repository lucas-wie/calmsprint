import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './Styles/PomodoroTimer.css'

export default (props) => {
  const [time, setTime] = useState(25 * 60); // Tempo inicial em segundos
  const [running, setRunning] = useState(false);
  const [timeSection, setTimeSection] = useState();

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
    $('#btn-pause').hide();
    $('#btn-reset').show();
    setRunning(false);
  };

  const resetTimer = (time) => {
    $('#btn-start').show();
    $('#btn-pause').hide();
    $('#btn-reset').hide();
    setTime(time  * 60);
    setRunning(false);
  };

  const handleButtonClick = (type) => {
    switch (type) {
      case "focus":
        setTimeSection(25);
        $('#focus').addClass("btn-focus");
        $('#shortbreak').removeClass("btn-focus");
        $('#longbreak').removeClass("btn-focus");
        resetTimer(25);
        break;
      case "shortbreak":
        setTimeSection(5);
        $('#shortbreak').addClass("btn-focus");
        $('#focus').removeClass("btn-focus");
        $('#longbreak').removeClass("btn-focus");
        resetTimer(5);
        break;
      case "longbreak":
        setTimeSection(15);
        $('#longbreak').addClass("btn-focus");
        $('#focus').removeClass("btn-focus");
        $('#shortbreak').removeClass("btn-focus");
        resetTimer(15);
        break;
      default:
        resetTimer(timeSection);
        break;
  }};

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <div className="section-container">
        <button id="focus" className={"btn btn-focus"} onClick={() => handleButtonClick("focus")}>
          Focus
        </button>
        <button id="shortbreak" className={"btn"} onClick={() => handleButtonClick("shortbreak")}>
          Short Break
        </button>
        <button id="longbreak" className={"btn"} onClick={() => handleButtonClick("longbreak")}>
          Long Break
        </button>
      </div>
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
          <button id="btn-reset" onClick={() => handleButtonClick("")}>
            Reset
          </button>
        </div>
      </div>
    </div>

  );
};