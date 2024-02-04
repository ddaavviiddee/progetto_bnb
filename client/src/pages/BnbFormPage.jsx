import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Perks from '../components/Perks';
import axios from 'axios'
import PhotoUpload from '../components/PhotoUpload';
import AccountNavbar from '../components/AccountNavbar';
import { UserContext } from '../UserContext';

const BnbFormPage = () => {

    const { id } = useParams();
    const {user} = useContext(UserContext);
    
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        
        if (!user) {
            return;
        }

        if (id) {
        axios.get('/bnb/' + id).then(res => {
            const { data } = res;

            // Controlla se ci sia il bnb o se l'account loggato è il proprietario: se una di queste
            // è vere allora l'utente verrà reindirizzato
            if (user._id != data?.owner?._id) {
                setRedirect(true);
                
            } else {              
                setTitle(data.title);
                setAddress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
                setPrice(data.price);
            }      
        })
        }   

    }, [id, user]) // Effettua questo controllo ogni volta che id o user cambiano

    function inputHeader(text) {
        return (
            <h2 className='text-lg mt-4'>{text}</h2>
        );
    }

    function paragraph(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        );
    }

    function placeHolder(header, description) {
        return (
            <>
                {inputHeader(header)}
                {paragraph(description)}
            </>
        )
    }

    // Questa funzione serve sia per craere un bnb che per modificarlo
    async function addNewBnb(e) {
        e.preventDefault();

        // Se abbiamo già un id vuol dire che il bnb è già stato creato e lo dobbiamo modificare
        if (id) {
            const bnbData = {
                id, title, address, addedPhotos, description, perks,
                extraInfo, checkIn, checkOut, maxGuests, price
            };

            await axios.put('/bnb', bnbData)
            setRedirect(true);
        }
        else {
            const bnbData = {
            title, address, addedPhotos, description, perks,
            extraInfo, checkIn, checkOut, maxGuests, price
            };

        await axios.post('/bnb', bnbData)
        setRedirect(true);}
        
    }

    async function removeBnb(){
        if (id){
            await axios.delete('/bnb/'+id, id);
            setRedirect(true);
        }

    }

    useEffect(()=>{
        if (redirect) {
            navigate('/account/bnb')
        }

    }, [redirect, navigate])

    return (
        <div>
            <AccountNavbar />
            <div className='flex justify-center'>
                <form onSubmit={addNewBnb} >

                    {placeHolder('Nome bnb', 'Inserisci un nome attraente per il tuo bnb')}
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Es. Il mio bellissimo appartamento' />

                    {placeHolder('Indirizzo', 'Inserisci un indirizzo valido')}
                    <input value={address} onChange={e => setAddress(e.target.value)} type="text" placeholder='Es. Via Bruni 24, MI' />

                    {placeHolder('Foto', 'Più foto inserisci, meglio è!')}
                    <PhotoUpload addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                    {placeHolder('Descrizione', 'Descrivi il tuo bnb.')}
                    <textarea value={description} onChange={e => setDescription(e.target.value)} name="" id="" cols="10" rows="10"></textarea>

                    {placeHolder('Caratteristiche', 'Inserisci le caratteristiche del tuo bnb.')}
                    <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2'>
                        <Perks selected={perks} onChange={setPerks} />
                    </div>

                    {placeHolder('Check-in e Check-out', "Inserisci l'orario del Check-in e del Check-out")}
                    <div className='grid sm:grid-cols-2 gap-2 '>
                        <div className=''>
                            <h3 className='mt-2 -mb-1'>Orario di Check-in</h3>
                            <input value={checkIn}
                                onChange={e => setCheckIn(e.target.value)} type="time" placeholder='12:00' />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1'>Orario di Check-out</h3>
                            <input value={checkOut}
                                onChange={e => setCheckOut(e.target.value)} type="time" placeholder='19:00' />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1'>Numero massimo di ospiti</h3>
                            <input value={maxGuests}
                                onChange={e => setMaxGuests(e.target.value)} className='rounded-2xl' type="number" />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1'>Prezzo per notte (in €)</h3>
                            <input value={price}
                                onChange={e => setPrice(e.target.value)} className='rounded-2xl' type="number" />
                        </div>

                    </div>

                    {placeHolder('Info Extra', 'Aggiungi ulteriori informazioni')}
                    <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} name="" id="" cols="5" rows="2"></textarea>

                    <div className=''>
                        <button className='primary'>Aggiungi</button>
                    </div>         
                </form>
            </div>
            {id && (
                        <div>
                            <button onClick={removeBnb} className='p-2 mt-2 mb-10 w-full text-white text-lg rounded-2xl bg-red-500'>Rimuovi bnb</button>
                        </div>
                    )}
        </div>
    )
}

export default BnbFormPage