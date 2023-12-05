// src/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css';


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null); // Adiciona estado para mensagem de erro
    const navigate = useNavigate(); // Utilize useNavigate para obter a função de navegação
    // const { getEmail } = useUser();
    

    const handleLogin = async () => {
        try {
            // Implemente a lógica de chamada para o backend aqui
            const response = await fetch(`http://localhost:8080/login?email=${email}&password=${password}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const user = await response.json();
            // getEmail(user.email);
            
            if(response.ok) {
                const result = await response;
                console.log(result); // Exiba o resultado no console ou trate conforme necessário
                // Se o login for bem-sucedido, use a função navigate para redirecionar para /dashboard
                navigate('/dashboard');
            }
            else {
                console.error('Erro ao fazer login:', response.statusText);
                setError('Credenciais inválidas. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Ocorreu um erro. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="container">
            <form className="form">
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
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
                <div className="register-link" onClick={() => navigate('/register')}>
                    Registrar-se
                </div>
            </form>
        </div>
    );
};

export default Login;
