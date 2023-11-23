// src/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Register.css';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Implemente a lógica de chamada para o backend aqui
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        navigate('/login'); // Após o registro bem-sucedido, redirecione para a tela de Login
      } else {
        console.error('Erro ao registrar:', response.statusText);
        setError('Erro ao registrar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setError('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="container">
      <h2>Registrar-se</h2>
      <form className="form">
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button type="button" onClick={handleRegister}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
