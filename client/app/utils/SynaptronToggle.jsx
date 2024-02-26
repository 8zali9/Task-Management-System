"use client"

import { useState, useEffect, createContext } from 'react'

export const SynToggleContext = createContext()

export function SynaptronToggle({ children }) {
  const [synaptronToggle, setSynaptronToggle] = useState(false)

  function handleSynaptronToggle () {
    setSynaptronToggle(!synaptronToggle)
  }

  return (
    <SynToggleContext.Provider value={{ synaptronToggle, setSynaptronToggle, handleSynaptronToggle }}>
        { children }
    </SynToggleContext.Provider>
  );
}