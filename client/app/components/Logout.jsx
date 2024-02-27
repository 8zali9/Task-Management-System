"use client"

import {React, useContext} from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { AuthContext } from '../utils/TokenProvider'

async function updateLocalStorage(){
  localStorage.setItem('userID', "");
  localStorage.setItem('userName', "");
  localStorage.setItem('userEmail', "");
}

export default function Logout() {
  const { setTokenIsPresent } = useContext(AuthContext);
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
      router.push('/')
      toast.dark("User signed out");
    }
    else{
      toast.dark("Problem logging out")
    }
  }

  return (
    <div className='updateForm-pg'>
      <form className='update-form' onSubmit={handleLogoutFormSubmit}>
        <legend>Are you sure you want to logout?</legend>
        <button type='submit' className='login-form-btn'>Yes, Logout</button>
      </form>
    </div>
  );
}
