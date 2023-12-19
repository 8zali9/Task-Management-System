"use client"

import Link from 'next/link'
import React, {useState} from 'react'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuthSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:2424/api/user/signin', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password })
    })

    const data = await response.json();

    if (data.status === 201) {
      console.log('Authed.')
    }
    else{
      console.log('Not Auth')
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input className='form-input'
          required
          placeholder='Your Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
