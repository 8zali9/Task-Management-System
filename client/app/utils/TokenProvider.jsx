"use client"

import { useState, useEffect, createContext } from 'react'

export const AuthContext = createContext()

export function TokenProvider({ children }) {
  const [token, setToken] = useState("")
  const [tokenIsPresent, setTokenIsPresent] = useState(false)

  // if http is set to false (for any reason during development);
  useEffect(() => {
    const storedToken = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (storedToken) {
        const fetchedTokenValue = storedToken.split('=')[1];
        setToken(fetchedTokenValue);
        setTokenIsPresent(true)
    }
  }, [setToken])

  return (
    <AuthContext.Provider value={{ token, setToken, tokenIsPresent, setTokenIsPresent }}>
        { children }
    </AuthContext.Provider>
  );
}