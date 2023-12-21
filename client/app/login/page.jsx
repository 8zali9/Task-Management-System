"use client"

import Link from 'next/link'
import React, {useState} from 'react'

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleAuthSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:2424/api/user/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail, userPassword }),
    });

    const data = await response.json();

    // Enter into the account : Get user
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
