"use client"

import React from 'react'

const getUserDetails = async (userID) => {
  const response = await fetch(`http://localhost:2424/api/user/${userID}`)
  
  const userDetails = await response.json()

  return userDetails
}

export default async function page({userID}) {
  const userDetails = await getUserDetails(userID)

  if ((!Array.isArray(userDetails)) || (userDetails.length === 0)) {
    return (
      <div className='User Doesnt exist'>Problem fetching details.</div>
    )
  }

  return (
    <div className='profile-pg'>
      <div className='user-details'>
        {userDetails.map((i) => (
          <div key={i.userID}>
            <p>Name: {i.userName}</p>
            <p>Email: {i.userEmail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
// signOutUser,
// getUser,
// updateUser,
// deleteUser,