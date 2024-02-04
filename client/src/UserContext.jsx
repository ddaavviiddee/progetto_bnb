import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {

    
  const [user, setUser] = useState(null);
  // Questo stato serve a capire se l'user viene fetchato, in quanto il return può essere renderizzato prima
  // di pescare la sessione dell'user
  const [ready, setReady] = useState(false);

  useEffect(()=>{
    if (!user){
        axios.get('/profile').then(({data})=>{
            setUser(data);
            setReady(true);
        });
        
    }
  }, []);

  return (
    <UserContext.Provider value={{user, setUser, ready}}>
    {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider


