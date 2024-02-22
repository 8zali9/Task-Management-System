"use client"

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/TokenProvider';

export default function ProfilePage() {
  const userID = localStorage.getItem('userID')
  const { token } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:2424/api/user/${userID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, [userID, token]);

  if ((!Array.isArray(userDetails)) || (userDetails.length === 0)) {
    return (
      <div className='User Doesnt exist'>Problem fetching details.</div>
    );
  }

  return (
    <div className='profile-pg'>
      <div className='user-details'>
        {userDetails.map((user) => (
          <div key={user.userID}>
            <p className='name'>Name: {user.userName}</p>
            <p className='details'>Email: {user.userEmail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
