import React from 'react';
import { format, differenceInCalendarDays } from 'date-fns';

const BookingDates = ({ booking }) => {
  return (
    <div className="text-xl">
      <div className="mt-6 text-lg">
        <div className="flex flex-col gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
          <span className="text-center">
            {differenceInCalendarDays(
              new Date(booking.checkOut),
              new Date(booking.checkIn)
            )}{' '}
            notti
          </span>
          <span className="text-center">
            Check in {booking.bnb.checkIn} del{' '}
            {format(new Date(booking.checkIn), 'dd/MM/yyyy')}
          </span>
          <span className="text-center">
            Check out {booking.bnb.checkOut} del{' '}
            {format(new Date(booking.checkOut), 'dd/MM/yyyy')}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1 items-center" >
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>
        <span className="text-xl text-center">Prezzo: €{booking.price}</span>
      </div>
    </div>
  );
};

export default BookingDates;
