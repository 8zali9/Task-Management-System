"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import { AuthContext } from '../utils/TokenProvider'
import { useState, useContext } from 'react';

export default function Login() {
  const { token, setToken } = useContext(AuthContext);
  const router = useRouter()

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleAuthSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:2424/api/user/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail, userPassword }),
      credentials: 'include'
    });
    
    if (response.status === 201) {
      const data = await response.json();
      localStorage.setItem('userID', data.userID);
      const storedToken = document.cookie.split('; ').find(row => row.startsWith('jwt='));
      if (storedToken) {
          const fetchedTokenValue = storedToken.split('=')[1];
          await setToken(fetchedTokenValue);
      }
      router.push('/profile')
      toast.dark("Your TM Workspace");
    }
    else{
      toast.dark("Incorrect Credentials")
    }
  }

  return (
    <div className='login-pg'>
      <form className='login-form' onSubmit={handleAuthSubmit}>
        <legend>Login to your Accout</legend>
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
          <Link className='nha-link' href='/'>Signup</Link>
        </div>
      </form>
    </div>
  )
}
