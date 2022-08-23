import react, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const GlobalContext = react.createContext();

export function useGlobalContext() {
  return react.useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    axios.get('/api/questions').then((results) => {
      setFolders(results.data);
    });
  }, []);

  const value = useMemo(() => {
    return {
      folders,
      setFolders,
    };
  });

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
