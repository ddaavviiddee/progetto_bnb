import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import Search from './Search';

const Header = () => {
    const { user } = useContext(UserContext);
    


    return (
        <header className='flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4 border-b border-gray-300 bg-white'>
            <Link to={'/'} href="" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                </svg>
                <span className='font-bold text-xl text-primary'>dabnb</span>
            </Link>
            <div className='flex items-center gap-4 py-2 md:py-0 md:px-4 border-t md:border-t-0 border-gray-300 '>
                <Search/>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Link to={user ? '/account' : '/login'} className='flex flex-col items-center py-2 md:py-0 md:px-4 md:w-auto'>
                    <div className='rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    {user && (
                        <div className='text-center'>
                            {user.name}
                        </div>
                    )}
                </Link>
            </div>

        </header>
    )
}

export default Header