// src/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css';


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null); // Adiciona estado para mensagem de erro
    const navigate = useNavigate(); // Utilize useNavigate para obter a função de navegação
    

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
            //console.log(user);
            //console.log(user.id);
            
            
            if(response.ok) {
                // Se o login for bem-sucedido, use a função navigate para redirecionar para /dashboard
                navigate('/dashboard', {state: {userID: user.id}});
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
        <div className="containerLogin">
            <h2 className='title-login'>Calmsprint</h2>
            <form className="formLogin">
                <div className='form-item-login'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className='inputs-login'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-item-login'>
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
                
                <div className='container-buttons-login'>
                    <button className='button-login' type="button" onClick={handleLogin}>
                        Login
                    </button>
                    <div className="register-link" onClick={() => navigate('/register')}>
                        Registrar-se
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
