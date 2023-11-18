import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css'

function App() {
  // Adicione um estado para controlar se o usuário está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Lógica de autenticação (pode ser uma chamada assíncrona ao backend)
    // Por enquanto, só vamos simular que o login é bem-sucedido após 2 segundos
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 1000);
  };

  return (
    <Router>
      <div>
        <h1>Calmsprint</h1>
          {/* Use Navigate para redirecionar para /login se não estiver autenticado */}
          {!isAuthenticated ? 
          (
            <Navigate to="/login" />
          ) : 
          ( 
            <Navigate to="/dashboard" /> 
          )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
