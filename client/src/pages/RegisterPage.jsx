import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAlert, setPasswordAlert] = useState(false);
    const navigate = useNavigate();

    async function registerUser(e) {
        // Piccola validazione della password
        e.preventDefault();
        if (password.length >= 5) {
            try {
                await axios.post('/register', {
                    name,
                    email,
                    password,
                });
                alert("Registrazione completata, ora puoi effettuare il Login");
                navigate('/login')
                
            } catch (error) {
                alert("L'e-mail è già in uso, prova una e-mail differente");
            }
            
        } else {
            setPasswordAlert(true);
        }
        
    }

    return (
        <div className='mt-6 grow flex items-center justify-around'>
            <div className='mb-32'>
                <h1 className='text-3xl text-center mb-3'>Registrati</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input className='placeholder: pl-3' type="text" 
                        placeholder='Inserisci il tuo nome' 
                        value={name} 
                        onChange={e => setName(e.target.value)}/>
                    <input className='placeholder: pl-3' type="email" 
                        placeholder='Inserisci la tua e-mail' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}/>
                    <input className='placeholder: pl-3' type="password" 
                        placeholder='Inserisci la tua password' 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}/>
                    {passwordAlert && (
                        <span className='text-red-500'>Inserire una password di almeno 5 caratteri.</span>
                    )}
                    <button className='primary mt-4'>Registrati</button>
                    <div className='text-center mt-2 text-gray-600'>
                        Hai già un account? Effettua il <Link className='underline text-gray-900'to={'/Login'}>login</Link>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default RegisterPage