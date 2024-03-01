"use client"

import {React, useContext} from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { AuthContext } from '../../utils/TokenProvider'
import { ToggleFormContext } from '../../utils/ToggleForm';

async function updateLocalStorage(){
  localStorage.setItem('userID', "");
  localStorage.setItem('userName', "");
  localStorage.setItem('userEmail', "");
}

export default function Logout() {
  const { setTokenIsPresent } = useContext(AuthContext);
  const { handleLogoutFormToggle } = useContext(ToggleFormContext)

  const router = useRouter()
  const handleLogoutFormSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`http://localhost:2424/api/user/signout`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    const data = await response.json();
    if (response.status === 200) {
      await updateLocalStorage()
      await setTokenIsPresent(false)
      router.push('/login')
      toast.dark("User signed out");
    }
    else{
      toast.dark("Problem logging out")
    }

    handleLogoutFormToggle()
  }

  return (
    <div className='general-form-pg'>
      <form className='general-form' onSubmit={handleLogoutFormSubmit}>
        <legend>Are you sure you want to logout?</legend>
        <div className='general-form-btns-div'>
          <button type='submit' className='general-form-btn'>Yes, Logout</button>
          <button onClick={handleLogoutFormToggle} type='submit' className='general-form-btn cancel-btn'>Cancel</button>
        </div>
      </form>
    </div>
  );
}
