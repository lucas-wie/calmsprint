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
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Erro ao registrar:', response.statusText);
        setError('Erro ao registrar. Usuário já cadastrado.');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setError('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="container-register">
      <h2 className='title-login'>Calmsprint</h2>
      <form className="form">
        <div className='form-item'>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className='inputs-login'
            value={name}
            autoComplete='off'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-item'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className='inputs-login'
            value={email}
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-item'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className='inputs-login'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button className='button-login' type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
