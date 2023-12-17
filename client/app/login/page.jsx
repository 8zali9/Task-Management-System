import Link from 'next/link'
import React from 'react'

export default function Login() {
  return (
    <div className='login-pg'>
      <form className='login-form'>
        <legend>Login to your Accout</legend>
        <input className='form-input'
          type='email'
          placeholder='Your Email'
          required
        />
        <input className='form-input'
          type='password'
          placeholder='Your Password'
          required
        />

        <button className='login-form-btn'>Login</button>

        <div className='not-have-acc'>
          <p>Not have an account?</p>
          <Link className='nha-link' href='/'>Signup</Link>
        </div>
      </form>
    </div>
  )
}
