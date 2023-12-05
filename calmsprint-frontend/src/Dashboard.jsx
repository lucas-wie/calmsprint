// src/Dashboard.tsx
import React from 'react';
import './Styles/Dashboard.css';
import BoardKanban from './BoardKanban.jsx';
import Pomodoro from './Pomodoro.jsx';

export default function Dashboard() {
    return (
        <div>
          <Pomodoro />
          {/* <BoardKanban /> */}
        </div>
      );
};
