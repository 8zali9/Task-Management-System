"use client"

import {React, useContext} from 'react'
import { toast } from 'react-toastify';
import ToastMsg from '../../utils/ToastMsg'
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
      toast.dark(<ToastMsg msg={"User signed out"} color={"rgb(76, 240, 76)"} />);
    }
    else{
      toast.dark(<ToastMsg msg={"Problem logging out"} color={"red"} />);
    }

    handleLogoutFormToggle()
  }

  return (
    <div className='general-form-pg'>
      <form className='general-form' onSubmit={handleLogoutFormSubmit}>
        <legend>Are you sure you want to logout?</legend>
        <div className='general-form-btns-div'>
          <button type='submit' className='general-form-btn'>Yes, Logout</button>
          <button onClick={handleLogoutFormToggle} className='general-form-btn cancel-btn'>Cancel</button>
        </div>
      </form>
    </div>
  );
}
