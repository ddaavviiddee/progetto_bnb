import React, { useContext, useEffect, useState } from 'react'
import { addDays, differenceInCalendarDays, parseISO } from 'date-fns';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Booking = ({ bnb, bookedDates }) => {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();


    // Questa variabile viene inserita all'interno del componente datepicker per disabilitare le date già prenotate
    const disabledDates = bookedDates.map(({ checkIn, checkOut }) => {
        // Converte dall'ISO i valori di checkIn e CheckOut
        const startDate = parseISO(checkIn);
        const endDate = parseISO(checkOut);
        const dates = [];
        let currentDate = startDate;

        // Per poi inserire una data fino ad arrivare al checkOut
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate = addDays(currentDate, 1);
        }

        return dates;
    }).flat(); // Infine viene confertita in un valore accettato da datepicker
      
    useEffect(() => {

        if (user) {
            setName(user.name);
        }

    }, [user]);

    let numberOfNights = 0;

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }



    async function bookBnb() {

        if (!checkIn || !checkOut || !guests || !name || !phoneNumber){
            alert("Tutti i campi devono essere inseriti!");
            return;
        }

        const res = await axios.post('/bookings', {
            checkIn, checkOut, guests,
            name,
            phoneNumber,
            bnb: bnb._id,
            price: numberOfNights * bnb.price
        });

        const bookingId = res.data._id;
        setRedirect('/account/bookings/' + bookingId);

    }

    useEffect(() => {
        if (redirect) {
            navigate(redirect)
        }

    }, [redirect, navigate])

    return (
        <div className='bg-gray-300 p-4 rounded-lg'>
            {user ?
                <div>
                    <div className='text-xl text-center'>
                        Prezzo per notte: €{bnb.price}
                    </div>
                    <div className='rounded-md mt-4'>
                        <div className="flex justify-center gap-5">
                            <div className='my-4 bg-gray-200 p-4 rounded-lg mt-4'>
                                <p>Check-In &#8203; &#8203; &#8203; &#8203;</p>
                                <DatePicker
                                    selected={checkIn ? new Date(checkIn) : null}
                                    onChange={date => setCheckIn(date)}
                                    minDate={new Date()}
                                    maxDate={new Date(bnb.checkOut)}
                                    excludeDates={disabledDates}
                                    required
                                    
                                />
                            </div>

                            <div className='my-4 bg-gray-200 p-4 rounded-lg mb-4'>
                                <p>Check-Out</p>
                                <DatePicker
                                    selected={checkOut ? new Date(checkOut) : null}
                                    onChange={date => setCheckOut(date)}
                                    minDate={new Date(bnb.checkIn)}
                                    excludeDates={disabledDates}
                                    required
                                />
                            </div>

                        </div>
                        <div>
                            <p>Numero di ospiti:</p>
                            <input type="number" 
                            value={guests} 
                            onChange={e => {
                                const maxValue = Math.min(parseInt(e.target.value), bnb.maxGuests);
                                setGuests(maxValue)}} 
                            min='1' 
                            max={bnb.maxGuests}
                            required
                            />
                        </div>
                        {numberOfNights > 0 && (
                            <div>
                                <div className=''>
                                    <label htmlFor="">Il tuo Nome e Cognome:</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} required/>
                                </div>
                                <div className=''>
                                    <label htmlFor="">Numero di telefono:</label>
                                    <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required/>
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="primary mt-2" onClick={bookBnb}>
                        Prenota
                        {numberOfNights > 0 && (
                            <span> - €{numberOfNights * bnb.price}</span>
                        )}
                    </button>
                </div>
                : <Link to={'/login'}>Vuoi prenotare questo bnb? Effettua il login.</Link>}
        </div>
    )
}

export default Booking