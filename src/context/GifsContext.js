import React, { useState } from "react";

const Context = React.createContext({});

export function GifsContextProvider({ children }) {
  const [gifs, setGifs] = useState([]);

  const value = {
    gifs,
    setGifs,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Context;
