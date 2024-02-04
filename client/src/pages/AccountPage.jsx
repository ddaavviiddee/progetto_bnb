import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BnbPage from './BnbPage';
import AccountNavbar from '../components/AccountNavbar';

const AccountPage = () => {

    const { user, ready, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [toHome, setToHome] = useState(null);

    // useParams permette di capire in che sottopagina siamo, quindi se account/bookings, account/bnb etc...
    let { subpage } = useParams();

    // Questo perché se siamo solo su account, allora la subpage risulterà undefined, quindi meglio 
    // assegnarla come profile per lo stile 
    if (subpage == undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        // Una volta effettuato il logout, rimanda alla home e resetta il contesto utente
        setToHome('/');
        setUser(null);
    }

    


    // Semplice logica per una gif del caricamento
    if (!ready) {
        return (<div className='mt-6 grow flex items-center justify-around'>
            <img className='w-8 h-8' src="https://i.stack.imgur.com/kOnzy.gif" alt="" />
        </div>);
    }

    // Se il contesto è stato prelevato e non c'è un user allora viene mandato al login.
    // Il toHome serve per non rimandare l'utente al login quando si effettua il logout, ma alla home
    if (ready && !user && !toHome) {
        return navigate('/login');
    }

    if (toHome) {
        navigate(toHome);
    }

    return (
        <div>
            <AccountNavbar/>
            {subpage === 'profile' && (
                <div className='text-center mb-10 max-w-lg mx-auto mt-10'>
                    Loggato come {user?.name} <br />
                    <button onClick={logout} className='bg-red-500 rounded-2xl py-2 px-8 mt-8'>Logout</button>
                </div>
            )}

            {subpage === 'bnb' && (
                <BnbPage></BnbPage>
            )}

        </div>
    )
}

export default AccountPage