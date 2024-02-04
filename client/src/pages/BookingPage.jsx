import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MapLink from '../components/MapLink';
import BnbGallery from '../components/BnbGallery';
import BookingDates from '../components/BookingDates';

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Questa query prende le proprie prenotazioni
      axios.get('/bookings').then(res => {
        const foundBooking = res.data.find(({ _id }) => _id === id);

        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  useEffect(()=>{
    if (redirect) {
        navigate('/account/bookings')
    }

  }, [redirect, navigate])

  async function deleteBnb(){

    await axios.delete('/bookings/'+ id);
    setRedirect(true);

  }

  if (!booking || !booking.bnb) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className='my-10 mx-4 md:mx-20 lg:mx-36 2xl:mx-96'>
      <h1 className='text-3xl text-center md:text-left'>{booking.bnb.title}</h1>
      <MapLink bnb={booking.bnb} />
      <div className='bg-gray-200 p-4 mb-4 rounded-2xl mt-4 flex flex-col md:flex-row justify-between items-center '>
        <div className='mb-4 md:mb-0 '>
          <h1 className='text-2xl mb-2'>Informazioni sulla tua prenotazione:</h1>
          <BookingDates booking={booking} />
          <h2 className='my-2'>Contatta l'host: {booking.user.email}</h2>
        </div>
        <div className='bg-red-500 px-6 py-6 md:py-10 text-white rounded-2xl'>
          <button onClick={deleteBnb} className='text-2xl'>Cancella prenotazione</button>
        </div>
      </div>
      <BnbGallery bnb={booking.bnb} />
    </div>
  );
};

export default BookingPage;
