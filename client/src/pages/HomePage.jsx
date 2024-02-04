import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const HomePage = () => {

  const [bnbs, setBnbs] = useState([]);

  // Fetch dei BnB
  useEffect(() => {
    axios.get('/bnb').then(res => {
      setBnbs(res.data);
    });

  }, [])
  return (
    <div className='mt-10 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {bnbs.length > 0 && bnbs.map(bnb => (
        <Link to={'/bnb/'+bnb._id} key={bnb._id}>
          <div className='bg-gray-400 rounded-2xl flex mb-2' >
            {bnb.photos?.[0] && (
              <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/' + bnb.photos[0]} alt="" />
            )}

          </div>
          <h2 className='text-md font-semibold truncate leading-4 pb-1'>{bnb.address}</h2>
          <h3 className='text-sm'>{bnb.title}</h3>
          <div>
            <span className='font-bold'>€{bnb.price}</span> a notte
          </div>
        </Link>
      ))}
    </div>
  )
}

export default HomePage