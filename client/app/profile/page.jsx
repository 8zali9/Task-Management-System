"use client"

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/TokenProvider';
import { ToggleFormContext } from '../utils/ToggleForm';
import UpdateProfile from '../components/pageComponents/UpdateProfile';
import Logout from '../components/pageComponents/Logout'
import { FaRegEdit } from "react-icons/fa";

export default function ProfilePage() {
  const userID = localStorage.getItem('userID')
  const [userDetails, setUserDetails] = useState([]);
  const { tokenIsPresent } = useContext(AuthContext);
  const { toggleUpdForm, toggleLogoutForm, handleUpdFormToggle, handleLogoutFormToggle } = useContext(ToggleFormContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:2424/api/user/${userID}`, {
          method: 'GET',
          headers: {
            // 'Authorization': `Bearer ${token}`,
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
  }, [userID]);

  if ((!Array.isArray(userDetails)) || (userDetails.length === 0)) {
    return (
      <div className='profile-pg'>
        <div className='User Doesnt exist'>Problem fetching details.</div>
      </div>
    );
  }

  return (
    <div className='profile-pg'>
      <div className='user-details'>
        <div className='pg-head'>
          <h3 className='pg-heading'>Dashboard</h3>
          <button onClick={handleUpdFormToggle}><FaRegEdit fontWeight='bolder' fontSize='20px'/></button>
        </div>
        {userDetails.map((user) => (
          <div className='user-div' key={user.userID}>
            <p className='name'><b>{user.userName}</b></p>
            <p className='details'>{user.userEmail}</p>
          </div>
        ))}
        <button className='logout-btn' onClick={handleLogoutFormToggle}>Logout</button>
      </div>
      <div className='update-form-pg'>
        {toggleUpdForm && <UpdateProfile />}
        {toggleLogoutForm && <Logout />}
      </div>
    </div>
  );
}
