import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../UserContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(e) {
        e.preventDefault();
        try {
            
            const userInfo = await axios.post('/login', {email, password});
            // Quando si effettua il login si setta la sessione dell'User e vai alla home
            setUser(userInfo.data);
            navigate("/");
            
        } catch (error) {
            alert("E-mail o password errati.");
        }
        
    };


    return (
        <div className='mt-6 grow flex items-center justify-around'>
            <div className='mb-32'>
                <h1 className='text-3xl text-center mb-3'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                    <input className='placeholder: pl-3' type="email" placeholder='Inserisci la tua e-mail' 
                    value={email} onChange={e => setEmail(e.target.value)}/>
                    <input className='placeholder: pl-3' type="password" placeholder='Inserisdi la tua password' 
                    value={password} onChange={e => setPassword(e.target.value)}/>
                    <button className='primary mt-4'>Login</button>
                    <div className='text-center mt-2 text-gray-600'>
                        Non hai un account? <Link className='underline text-gray-900'to={'/Register'}>Registrati</Link>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default LoginPage