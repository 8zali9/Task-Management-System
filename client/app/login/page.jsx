"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import { AuthContext } from '../utils/TokenProvider'
import { useState, useContext } from 'react';
import ToastMsg from '../utils/ToastMsg'
import config from '../config'

export default function Login() {
  const { setTokenIsPresent } = useContext(AuthContext);
  const router = useRouter()

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  async function tokenPresence() {
    await setTokenIsPresent(false);
  
    setTimeout(async () => {
      await setTokenIsPresent(true);
    }, 100);
  }

  const handleAuthSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`${config.url}/user/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail, userPassword }),
      credentials: 'include'
    });
    
    if (response.status === 201) {
      const data = await response.json();
      localStorage.setItem('userID', data.userID);
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('userEmail', data.userEmail);
      await tokenPresence()
      router.push('/profile')
      toast.dark(<ToastMsg msg={"Your TM Workspace"} color={"rgb(76, 240, 76)"} />);
    }
    else{
      toast.dark(<ToastMsg msg={"Incorrect Credentials"} color={"red"} />);
    }
  }

  return (
    <div className='login-pg'>
      <form className='login-form' onSubmit={handleAuthSubmit}>
        <legend>Login to your Account</legend>
        <input className='form-input'
          required
          placeholder='Your Email'
          type='email'
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
        />
        <input className='form-input'
          required
          placeholder='Your Password'
          type='password'
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
        />

        <button type='submit' className='login-form-btn'>Login</button>

        <div className='not-have-acc'>
          <p>Not have an account?</p>
          <Link className='nha-link' href='/register'>Signup</Link>
        </div>
      </form>
    </div>
  )
}
