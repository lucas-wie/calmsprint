import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, notification  } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import $ from 'jquery';
import './Styles/PomodoroTimer.css'

export default (props) => {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [timeSection, setTimeSection] = useState(time);
  const [currentSection, setCurrentSection] = useState("focus");

  const [timeFocus, setTimeFocus] = useState(25);
  const [timeShortBreak, setTimeShortBreak] = useState(5);
  const [timeLongBreak, setTimeLongBreak] = useState(15);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedTimes, setEditedTimes] = useState({
    focus: timeFocus,
    shortBreak: timeShortBreak,
    longBreak: timeLongBreak,
  });

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            setRunning(false);
            setNotificationVisible(true); // Exibe a notificação quando atingir 00:00
            return 0;
          }
          return prevTime - 1;
        });
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
        setTimeSection(timeFocus);
        setCurrentSection(type);
        $('#focus').addClass("btn-focus");
        $('#shortbreak').removeClass("btn-focus");
        $('#longbreak').removeClass("btn-focus");
        resetTimer(timeFocus);
        break;
      case "shortbreak":
        setTimeSection(timeShortBreak);
        setCurrentSection(type);
        $('#shortbreak').addClass("btn-focus");
        $('#focus').removeClass("btn-focus");
        $('#longbreak').removeClass("btn-focus");
        resetTimer(timeShortBreak);
        break;
      case "longbreak":
        setTimeSection(timeLongBreak);
        setCurrentSection(type);
        $('#longbreak').addClass("btn-focus");
        $('#focus').removeClass("btn-focus");
        $('#shortbreak').removeClass("btn-focus");
        resetTimer(timeLongBreak);
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
      setIsModalVisible(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEditTimer = () => {
    setTimeFocus(editedTimes.focus);
    setTimeShortBreak(editedTimes.shortBreak);
    setTimeLongBreak(editedTimes.longBreak);
    
    switch (currentSection) {
      case "focus":
        resetTimer(editedTimes.focus);
        break;
        case "shortbreak":
        resetTimer(editedTimes.shortBreak);
        break;
      case "longbreak":
        resetTimer(editedTimes.longBreak);
        break;
      default:
        break;
    }
    closeModal();
  };

  const showNotification = () => {
    notification.open({
      message: 'Sessão finalizada, hora de descansar!',
      description: 'Clique em "Ok" para fechar.',
      onClick: () => {
        notification.destroy();
      },
    });
  };

  const closeNotification = () => {
    setNotificationVisible(false);
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

        <div className='container-btn-edit-timer'>
          <button id="btn-edit-timer" onClick={openModal}>
            Config
          </button>
        </div>

        {/* MODAL CONFIGURE TIMER */}
        <Modal
          open={modalIsOpen}
          onCancel={closeModal}
          title="Configure Timer"
          footer={[
            <Button key="save" type="primary" onClick={handleEditTimer}>
              Save
            </Button>,
            <Button key="cancel" onClick={closeModal}>
              Cancel
            </Button>
          ]}
        >
          <label>
            Focus Time (minutes):
            <Input
              type="number"
              min="0"
              value={editedTimes.focus}
              onChange={(e) =>
                setEditedTimes({ ...editedTimes, focus: parseInt(e.target.value) })
              }
            />
          </label>
          <br />
          <label>
            Short Break Time (minutes):
            <Input
              type="number"
              min="0"
              value={editedTimes.shortBreak}
              onChange={(e) =>
                setEditedTimes({
                  ...editedTimes,
                  shortBreak: parseInt(e.target.value),
                })
              }
            />
          </label>
          <br />
          <label>
            Long Break Time (minutes):
            <Input
              type="number"
              min="0"
              value={editedTimes.longBreak}
              onChange={(e) =>
                setEditedTimes({ ...editedTimes, longBreak: parseInt(e.target.value) })
              }
            />
          </label>
        </Modal>
      </div>

      {/* MODAL NOTIFICATION */}
      <Modal
          open={notificationVisible}
          onCancel={closeNotification}
          footer={[
            <Button onClick={closeNotification}>Ok</Button>
          ]}
        >
          {notificationVisible && currentSection === "focus" && (
            <div className="notification-container">
              <div className="notification-content">
                <h2>Sessão finalizada, hora de descansar!</h2>
              </div>
            </div>
          )}
          {notificationVisible && currentSection === "shortbreak" && (
            <div className="notification-container">
              <div className="notification-content">
                <h2>Sessão finalizada, hora de focar!</h2>
              </div>
            </div>
          )}
          {notificationVisible && currentSection === "longbreak" && (
            <div className="notification-container">
              <div className="notification-content">
                <h2>Sessão finalizada, hora de focar!</h2>
              </div>
            </div>
          )}
        </Modal>
    </div>
  );
};