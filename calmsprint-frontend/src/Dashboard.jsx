// src/Dashboard.tsx
import React from 'react';
import BoardKanban from './BoardKanban.jsx';
import PomodoroTimer from './PomodoroTimer.jsx';
import { useLocation } from 'react-router-dom';

export default function Dashboard() {
  const location = useLocation();
  const userId = location.state.userID;

    return (
      <div>
        {/* <PomodoroTimer /> */}
        <BoardKanban userId={userId} />
      </div>
    );
};
