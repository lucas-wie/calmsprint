import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
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
        <Routes>
          {/* Use Navigate para redirecionar para /login se não estiver autenticado */}
          {!isAuthenticated ? 
          (
            <Route path="/login" element={<Login />} />
          ) : 
          ( 
            <Route path="/dashboard" element={<Dashboard />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
