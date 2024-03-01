"use client"

import { useState, createContext } from 'react'

export const ToggleNavBtnsContext = createContext()

export function ToggleNavBtns({ children }) {
  const [toggleProfileBtn, setToggleProfileBtn] = useState(true)
  const [toggleTasksBtn, setToggleTasksBtn] = useState(false)
  const [toggleGroupsBtn, setToggleGroupsBtn] = useState(false)

  const handleProfileBtnToggle = () => {
    setToggleProfileBtn(true)
    setToggleTasksBtn(false)
    setToggleGroupsBtn(false)
  }

  const handleTasksBtnToggle = () => {
    setToggleProfileBtn(false)
    setToggleTasksBtn(true)
    setToggleGroupsBtn(false)
  }

  const handleGroupsBtnToggle = () => {
    setToggleProfileBtn(false)
    setToggleTasksBtn(false)
    setToggleGroupsBtn(true)
  }

  return (
    <ToggleNavBtnsContext.Provider value={{ 
      toggleProfileBtn, toggleTasksBtn, toggleGroupsBtn,
      handleProfileBtnToggle, handleTasksBtnToggle, handleGroupsBtnToggle
    }}>
        { children }
    </ToggleNavBtnsContext.Provider>
  );
}