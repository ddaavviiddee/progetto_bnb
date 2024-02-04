import React, { useEffect, useState } from 'react'
import { Link, } from 'react-router-dom'
import AccountNavbar from '../components/AccountNavbar';
import axios from 'axios';
import BnbPhotos from '../components/BnbPhotos';

const BnbPage = () => {
    const [bnb, setBnb] = useState([]);

    useEffect(()=> {

        // Fetch dei propri Bnb

        axios.get('/userbnb').then(({data}) => {
            setBnb(data);
        });
        
    }, []);

    return (
        
        <div>
            <AccountNavbar/>
                <div className='text-center'>
                <Link className='inline-flex bg-primary text-white py-2 px-4 rounded-2xl mt-10' to={'/account/bnb/new'}>
                    <svg className='w-6 h-6 text-white mr-2' xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                        <path d="M21 11.9782C19.9897 12.625 18.7886 13 17.5 13C13.9101 13 11 10.0899 11 6.5C11 4.80998 11.645 3.27061 12.7022 2.1146C11.979 1.87734 11.1608 2.01672 10.5492 2.53275L3.79916 8.22729C3.29241 8.6548 3 9.28405 3 9.94704V19.75C3 20.7165 3.7835 21.5 4.75 21.5H7.75C8.7165 21.5 9.5 20.7165 9.5 19.75V14.75C9.5 14.3358 9.83579 14 10.25 14H13.75C14.1642 14 14.5 14.3358 14.5 14.75V19.75C14.5 20.7165 15.2835 21.5 16.25 21.5H19.25C20.2165 21.5 21 20.7165 21 19.75V11.9782Z" fill="#212121" />
                        <path d="M17.5 1C20.5376 1 23 3.46243 23 6.5C23 9.53757 20.5376 12 17.5 12C14.4624 12 12 9.53757 12 6.5C12 3.46243 14.4624 1 17.5 1ZM18.0011 9.50352L18.0006 7.00001H20.503C20.7792 7.00001 21.003 6.77615 21.003 6.50001C21.003 6.22387 20.7792 6.00001 20.503 6.00001H18.0005L18 3.49927C18 3.22313 17.7761 2.99927 17.5 2.99927C17.2239 2.99927 17 3.22313 17 3.49927L17.0005 6.00001H14.4961C14.22 6.00001 13.9961 6.22387 13.9961 6.50001C13.9961 6.77615 14.22 7.00001 14.4961 7.00001H17.0006L17.0011 9.50352C17.0011 9.77966 17.225 10.0035 17.5011 10.0035C17.7773 10.0035 18.0011 9.77966 18.0011 9.50352Z" fill="#212121" />
                    </svg>
                    dabnb la tua casa!
                </Link>
            </div>
            <div className='mt-6'>
                {bnb.length > 0 && bnb.map(bnb => (
                    <Link to={'/account/bnb/'+bnb._id} className='flex gap-4 bg-gray-200 p-4 rounded-2xl cursor-pointer m-2' key={bnb._id}>
                        <div className='flex w-32 h-32 bg-gray-300 shrink-0 rounded-md' >
                            <BnbPhotos className='rounded-md' bnb={bnb}/>
                        </div>
                        <div className='grow-0 shrink'>
                            <h2 className='text-xl font-semibold'>{bnb.title}</h2>
                            <p className='text-sm mt-2'>{bnb.description}</p>
                        </div>
                    </Link>
                ))}
            </div>   
        </div>
        
    )
}

export default BnbPage