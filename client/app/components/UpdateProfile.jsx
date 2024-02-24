"use client"

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/TokenProvider';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

function updateLocalStorage(name, email){
  localStorage.setItem('userName', name);
  localStorage.setItem('userEmail', email);
}

export default function UpdateProfile() {
  const router = useRouter()

  const userID = localStorage.getItem('userID')
  const userName = localStorage.getItem('userName')
  const userEmail = localStorage.getItem('userEmail')
  // upd - update
  const [nameToUpd, setNameToUpd] = useState(userName)
  const [emailToUpd, setEmailToUpd] = useState(userEmail)
  const { token } = useContext(AuthContext);

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`http://localhost:2424/api/user/${userID}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: nameToUpd, userEmail: emailToUpd }),
      credentials: 'include'
    });
    const data = await response.json();
    if (response.status === 200) {
      await updateLocalStorage(data.userName, data.userEmail)
      router.push('/tasks')
      toast.dark("Profile updated.");
    }
    else{
      toast.dark("Problem updating details")
    }
  }

  const isDisabled = !nameToUpd || !emailToUpd || (nameToUpd === userName && emailToUpd === userEmail);

  return (
    <div className='updateForm-pg'>
      <form className='update-form' onSubmit={handleUpdateFormSubmit}>
        <legend>Edit Profile Details</legend>
        <input className='form-input'
          required
          placeholder='New name'
          type='text'
          onChange={(e) => setNameToUpd(e.target.value)}
          value={nameToUpd}
        />
        <input className='form-input'
          required
          placeholder='New Email'
          type='email'
          onChange={(e) => setEmailToUpd(e.target.value)}
          value={emailToUpd}
        />

        <button disabled={isDisabled} type='submit' className='login-form-btn'>Update</button>
      </form>
    </div>
  );
}
