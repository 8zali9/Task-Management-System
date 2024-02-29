"use client"

import { useState, useEffect, createContext } from 'react'

export const ToggleFormContext = createContext()

// upd - update

export function ToggleForm({ children }) {
  const [toggleUpdForm, setToggleUpdForm] = useState(false)
  const [toggleLogoutForm, setToggleLogoutForm] = useState(false)
  const [toggleAddTaskForm, setToggleAddTaskForm] = useState(false)

  const handleUpdFormToggle = () => {
    setToggleUpdForm(!toggleUpdForm)
  }

  const handleLogoutFormToggle = () => {
    setToggleLogoutForm(!toggleLogoutForm)
  }

  const handleAddTaskFormToggle = () => {
    setToggleAddTaskForm(!toggleAddTaskForm)
  }

  return (
    <ToggleFormContext.Provider value={{ toggleUpdForm, toggleLogoutForm, toggleAddTaskForm, handleUpdFormToggle, handleLogoutFormToggle, handleAddTaskFormToggle }}>
        { children }
    </ToggleFormContext.Provider>
  );
}