import React, { useState, useEffect } from 'react'
import getfavs from 'services/getFavs'

const Context = React.createContext({})

export function UserContextProvider({ children }) {
  const [favs, setFavs] = useState([])
  // to get the jwt token from the storage (session in this case)
  const [jwt, setJWT] = useState(() => window.sessionStorage.getItem('jwt'))

  // useEffect to get all the favs one time
  useEffect(() => {
    if (!jwt) return setFavs([])
    getfavs({ jwt }).then(setFavs)
  }, [jwt])

  const value = {
    jwt,
    setJWT,
    favs,
    setFavs,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Context
