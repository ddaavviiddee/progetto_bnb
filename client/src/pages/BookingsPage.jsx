import React, { useEffect, useState } from 'react';
import AccountNavbar from '../components/AccountNavbar';
import axios from 'axios';
import BnbPhotos from '../components/BnbPhotos';
import { Link } from 'react-router-dom';
import BookingDates from '../components/BookingDates';

const BookingsPage = () => {
  const [bookings, setBookings] = useState();


  // Fetch delle prenotazioni
  useEffect(() => {
    axios.get('/bookings').then(res => {
      setBookings(res.data);
    });
  }, []);

  return (
    <div>
      <AccountNavbar />
      <div className='mt-10 lg:mx-36 2xl:mx-96'>
        {bookings?.length > 0 ?
          bookings.map(booking => (
            <Link
              key={booking._id}
              to={'/account/bookings/' + booking._id}
              className='flex flex-col sm:flex-row gap-4 bg-gray-200 rounded-2xl overflow-hidden items-center justify-center my-3'
            >              
                <div className='sm:w-1/2 md:w-1/3 lg:w-1/2 grow'>
                  <BnbPhotos bnb={booking.bnb} />
                </div>
                <div className='flex-1 py-3 items-center justify-center lg:items-start mt-2'>
                  <h2 className='text-xl mb-2 text-center'>{booking.bnb.title}</h2>
                  <BookingDates booking={booking} />
                </div>              
            </Link>
          )): <h1 className='text-center text-2xl'>Non hai ancora effettuato prenotazioni.</h1>}
      </div>
    </div>
  );
};

export default BookingsPage;
