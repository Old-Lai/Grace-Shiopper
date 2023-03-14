import { useState, useEffect } from 'react';
import { loginUser } from '../api';
import { useOutletContext, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useOutletContext();
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (token) {
            navigate('/products')
        }
     }, [token, navigate])

    async function submitRegistration(e) {
        e.preventDefault();
        const user = {
            user: {
                username,
                password
            }
        }
        const response = await loginUser(user);
        if (response.error) {
            setErrorMessage('Username or password are incorrect. Try again. ');
        } else {
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
        }
    }
    
    return (
    <section class="registerCss">
        <h1 class="registerTitle">Login</h1>
        <form onSubmit={submitRegistration}>
            <label >Username: </label>
            <input type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            />
            <label >Password: </label>
            <input type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage ? <p>{ errorMessage }</p> : null}
            <button type="submit" class="submitButton">Login</button>
        </form>
    </section>
    )     
};

export default Login; 



