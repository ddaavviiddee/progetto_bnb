import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';

const SearchResultPage = () => {

  const [searchResults, setSearchResults] = useState([]);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchLocation = queryParams.get('location');

  useEffect(() => {
    if (searchLocation) {
      // Esegui la tua chiamata API utilizzando la searchLocation
      axios.get(`/search?location=${encodeURIComponent(searchLocation)}`)
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error('Errore nella richiesta API di ricerca:', error);
        });
    }
  }, [searchLocation]);

  return (
    <div className='mt-10 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <Link to={`/bnb/${result._id}`} key={result._id}>
            <div className='bg-gray-400 rounded-2xl flex mb-2'>
              {result.photos?.[0] && (
                <img
                  className='rounded-2xl object-cover aspect-square'
                  src={`http://localhost:4000/uploads/${result.photos[0]}`}
                  alt=''
                />
              )}
            </div>
            <h2 className='text-md font-semibold truncate leading-4'>{result.address}</h2>
            <h3 className='text-sm'>{result.title}</h3>
            <div>
              <span className='font-bold'>€{result.price}</span> a notte
            </div>
          </Link>
        ))
      ) : (
        <p className='text-2xl'>Nessun risultato trovato per {searchLocation}</p>
      )}
    </div>
  );
};

export default SearchResultPage;
