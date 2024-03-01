"use client"

import { AuthContext } from '../../utils/TokenProvider';
import { useRouter } from 'next/navigation'
import { ToggleFormContext } from '../../utils/ToggleForm';
import { toast } from 'react-toastify';
import ToastMsg from '../../utils/ToastMsg'
import { useState, useContext } from 'react';

async function updateLocalStorage(){
  localStorage.setItem('userID', "");
  localStorage.setItem('userName', "");
  localStorage.setItem('userEmail', "");
}

export default function DeleteUser() {
  const { setTokenIsPresent } = useContext(AuthContext);
  const { handleDelAccountFormToggle } = useContext(ToggleFormContext)
  const [password, setPassword] = useState("")
  const router = useRouter()

  const userID = localStorage.getItem('userID')
  // const { token } = useContext(AuthContext);

  const handleDeleteFormSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`http://localhost:2424/api/user/${userID}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userPassword: password }),
      credentials: 'include'
    });
    const data = await response.json();
    if (response.status === 200) {
      router.push('/groups')
      setTimeout(async () => {
        await router.push('/login');
      }, 100);
      await updateLocalStorage()
      await setTokenIsPresent(false)
      toast.dark(<ToastMsg msg={"Your account has been deleted"} color={"rgb(76, 240, 76)"} />);
    }
    else{
      toast.dark(<ToastMsg msg={"Problem deleting your account"} color={"red"} />);
    }

    handleDelAccountFormToggle()
  }

  const isDisabled = !password;

  return (
    <div className='general-form-pg'>
      <form className='general-form account-delete-form' onSubmit={handleDeleteFormSubmit}>
        <legend>Account Deletion</legend>
        <b color='red'>This action cannot be undone once you proceed</b>
        <input className='general-form-input'
          required
          placeholder='Confirm your password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className='general-form-btns-div'>
          <button disabled={isDisabled} type='submit' className='general-form-btn'>Confirm Deletion</button>
          <button onClick={handleDelAccountFormToggle} className='general-form-btn cancel-btn'>Cancel</button>
        </div>
      </form>
    </div>
  );
}
