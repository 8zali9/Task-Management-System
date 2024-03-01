"use client"

import { useState, createContext } from 'react'

export const ToggleFormContext = createContext()

// upd - update

export function ToggleForm({ children }) {
  const [toggleUpdForm, setToggleUpdForm] = useState(false)
  const [toggleLogoutForm, setToggleLogoutForm] = useState(false)
  const [toggleAddTaskForm, setToggleAddTaskForm] = useState(false)
  const [toggleDelAccountForm, setToggleDelAccountForm] = useState(false)

  const handleUpdFormToggle = () => {
    setToggleUpdForm(!toggleUpdForm)
  }

  const handleLogoutFormToggle = () => {
    setToggleLogoutForm(!toggleLogoutForm)
  }

  const handleAddTaskFormToggle = () => {
    setToggleAddTaskForm(!toggleAddTaskForm)
  }

  const handleDelAccountFormToggle = () => {
    setToggleDelAccountForm(!toggleDelAccountForm)
  }

  return (
    <ToggleFormContext.Provider value={{ 
      toggleUpdForm, toggleLogoutForm, toggleAddTaskForm, toggleDelAccountForm,
      handleUpdFormToggle, handleLogoutFormToggle, handleAddTaskFormToggle, handleDelAccountFormToggle
    }}>
        { children }
    </ToggleFormContext.Provider>
  );
}