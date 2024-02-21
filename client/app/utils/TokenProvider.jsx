"use client"

import { useState, useEffect, createContext } from 'react'

export const AuthContext = createContext()

export function TokenProvider({ children }) {
  const [token, setToken] = useState("")

  useEffect(() => {
    const storedToken = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (storedToken) {
        const fetchedTokenValue = storedToken.split('=')[1];
        setToken(fetchedTokenValue);
    }
  }, [setToken])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
        { children }
    </AuthContext.Provider>
  );
}