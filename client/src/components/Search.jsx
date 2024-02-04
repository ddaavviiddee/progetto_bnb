import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [location, setLocation] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setLocation(inputValue);
    setIsSearchActive(inputValue.trim() !== '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className='flex gap-1' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Dove vuoi andare?'
        autoComplete='off'
        className='rounded-2xl bg-primary placeholder-white text-white -py-2 pl-4 w-16 focus:bg-white focus:pr-12 focus:placeholder-gray transition-all duration-300 transform focus:w-64 focus:text-gray-800'
        value={location}
        onChange={handleInputChange}
      />
      {isSearchActive && (
        <Link to={`/search?location=${encodeURIComponent(location)}`} className='mt-4'>
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </Link>
      )}
    </form>
  );
};

export default Search;
