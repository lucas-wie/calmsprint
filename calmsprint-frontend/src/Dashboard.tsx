// src/Dashboard.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardKanban from './BoardKanban'; // Importe o componente BoardKanban
import './Styles/Dashboard.css';


const Dashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Adicione o estado de autenticação
  const navigate = useNavigate();

  const handleLogout = () => {
    // Modifica a variável de autenticação para false
    setIsAuthenticated(false);
    // Redireciona para a tela de login
    navigate('/login');
  };

  const handleAddTask = () => {
    const newTask = {

    }
    // Implemente a lógica para adicionar uma nova task na coluna "Todo"
    // Certifique-se de incluir o id do usuário atual e o status correto
    console.log('Adicionar nova task');
  };

  return (
    <div className="dashboard-container">
    {/* Botão de Logout no canto superior direito */}
      {isAuthenticated && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}

      {/* Conteúdo do Dashboard */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Seu Dashboard</h1>

        {/* Botão para adicionar nova task */}
        <button className="add-task-button" onClick={handleAddTask}>
          Adicionar Nova Task
        </button>

        {/* Adicione o BoardKanban ao Dashboard */}
        <BoardKanban />
      </div>
    </div>
  );
};

export default Dashboard;
