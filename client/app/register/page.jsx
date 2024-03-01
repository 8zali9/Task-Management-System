"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import ToastMsg from '../utils/ToastMsg'
import { useState } from 'react';

export default function Register() {
  const router = useRouter()

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleAuthSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:2424/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, userEmail, userPassword }),
    });
    
    if (response.status === 201) {
      const data = await response.json();
      router.push('/login')
      toast.dark(<ToastMsg msg={`${userName} Registered`} color={"rgb(76, 240, 76)"} />);
      toast.dark(<ToastMsg msg={"Login to access your account"} color={"transparent"} />);
    }
    else{
      toast.dark(<ToastMsg msg={"Cannot register user"} color={"red"} />);
    }
  }

  return (
    <div className='login-pg signup-pg'>
      <form className='signup-form' onSubmit={handleAuthSubmit}>
        <legend>Register a new Accout</legend>
        <input className='form-input'
          required
          placeholder='Your Name'
          type='text'
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
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

        <button type='submit' className='login-form-btn'>Signup</button>

        <div className='not-have-acc'>
          <p>Already have an account?</p>
          <Link className='nha-link' href='/login'>Login</Link>
        </div>
      </form>
    </div>
  )
}
