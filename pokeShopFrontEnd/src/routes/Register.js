import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {registerUser} from '../api';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useOutletContext();
    //console.log(setToken);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
       if (token) {
           navigate('/products')
       }
    }, [token, navigate])
    
   async function submitRegistration(e) {
       e.preventDefault();
       if (!username) {
           setErrorMessage("Username required.");
       } else if (password.length < 8){
           setErrorMessage("Password needs to be at least 8 characters.")
       } else if (password !== confirmPassword) {
           setErrorMessage("Passwords must match.")
       } else {
           setErrorMessage("");
           const user = {
               user: {
                   username,
                   password
               }
           }
           const response = await registerUser(user);
           if (response.error) {
               setErrorMessage(response.error.message);
           } else {
               localStorage.setItem('token', response.data.token);
               setToken(response.data.token);
           }
       }
   }
   return (
   <section class="registerCss">
       <h1 class="registerTitle">Register</h1>
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
           <label >Confirm Password: </label>
           <input type="password" 
           value={confirmPassword} 
           onChange={(e) => setConfirmPassword(e.target.value)}
           />
           <button type="submit" class="submitButton">Register</button>
           <p>{errorMessage}</p>
       </form>
   </section>
   )     
}

export default Register; 
