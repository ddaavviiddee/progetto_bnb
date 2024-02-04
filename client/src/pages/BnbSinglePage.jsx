import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Booking from '../components/Booking';
import BnbGallery from '../components/BnbGallery';
import MapLink from '../components/MapLink';
import { UserContext } from '../UserContext';


const BnbSinglePage = () => {

    const { id } = useParams();
    const [bnb, setBnb] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const { user } = useContext(UserContext);


    // Fetch dei dati bnb e prenotazioni
    useEffect(() => {

        if (!id) {
            return;
        }

        axios.get('/bnb/' + id).then(res => {
            setBnb(res.data);
        })

        axios.get(`/bnb/${id}/booked-dates`).then((res) => {
            setBookedDates(res.data);
        });

    }, [id])

    if (!bnb) return '';

    // Se il bnb visitato appartiene all'untente, mostra questo
    if (user?._id == bnb?.owner?._id) {
        return (
            <div className='mt-10 bg-gray-100 -mx-6 px-8 py-8 rounded-2xl lg:mx-12 xl:mx-48 2xl:mx-72'>
                <h1 className='font-semibold text-2xl'>{bnb.title}</h1>
                <h2 className='flex gap-2 mt-1'>
                    Proprietà di:
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    {bnb.owner.name}
                </h2>
                <MapLink bnb={bnb} />
                <BnbGallery bnb={bnb} />

                <div className='mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8'>
                    <div>
                        <div className='my-4 '>
                            <h2 className='font-semibold text-xl'>Descrizione del BnB</h2>
                            {bnb.description}
                        </div>

                        <b>Check-In: </b> {bnb.checkIn} <br />

                        <b>Check-Out: </b> {bnb.checkOut} <br />
                        <b>Numero massimo di ospiti: </b> {bnb.maxGuests}


                        <h3 className='mt-2'>Altre informazioni:</h3>
                        <p className='text-sm'>{bnb.extraInfo}</p>

                    </div>
                    <div className='bg-gray-300 p-4 rounded-lg'>
                        <Link to={'/account/bnb/' + id}>Questo è il tuo bnb, se vuoi modificarlo clicca qui.</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='mt-10 bg-gray-100 -mx-6 px-8 py-8 rounded-2xl lg:mx-12 xl:mx-48 2xl:mx-72'>
            <h1 className='font-semibold text-2xl'>{bnb.title}</h1>
            <h2 className='flex gap-2 mt-1'>
                Proprietà di:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                {bnb.owner.name}
            </h2>
            <MapLink bnb={bnb} />
            <BnbGallery bnb={bnb} />

            <div className='mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8'>
                <div>
                    <div className='my-4 '>
                        <h2 className='font-semibold text-xl'>Descrizione del BnB</h2>
                        {bnb.description}
                    </div>

                    <b>Check-In: </b> {bnb.checkIn} <br />

                    <b>Check-Out: </b> {bnb.checkOut} <br />
                    <b>Numero massimo di ospiti: </b> {bnb.maxGuests} <br />

                    <b>Perks: </b> {bnb.perks.join(', ')}
                    <h3 className='mt-2'>Altre informazioni:</h3>
                    <p className='text-sm'>{bnb.extraInfo}</p>
                    

                </div>
                <div>
                    <Booking bnb={bnb} bookedDates={bookedDates}/>
                </div>
            </div>
        </div>
    )
}

export default BnbSinglePage