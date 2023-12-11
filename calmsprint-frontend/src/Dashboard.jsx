import React from 'react';
import BoardKanban from './BoardKanban.jsx';
import PomodoroTimer from './PomodoroTimer.jsx';
import Notes from './Notes.jsx';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Styles/Dashboard.css'


export default function Dashboard() {
  const location = useLocation();
  const userId = location.state.userID;
  const navigate = useNavigate();

    return (
      <div className='dashboard-container'>
        <div className='dashboard-content-pomo'>
          <PomodoroTimer />
          <button className='btn-logout' onClick={() => navigate('/login')}>
            Logout
          </button>
        </div>
          
        <div className='dashboard-content'>
          <BoardKanban userId={userId} />
          <Notes />
        </div>
      </div>
    );
};
