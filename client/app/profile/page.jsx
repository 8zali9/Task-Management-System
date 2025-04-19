"use client"

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/TokenProvider';
import { ToggleFormContext } from '../utils/ToggleForm';
import UpdateProfile from '../components/pageComponents/UpdateProfile';
import Logout from '../components/pageComponents/Logout'
import { FaRegEdit, FaInfoCircle } from "react-icons/fa";
import DeleteUser from '../components/pageComponents/DeleteUser';
import next from 'next';
import config from '../config'

export default function ProfilePage() {
  const userID = localStorage.getItem('userID')
  const [userDetails, setUserDetails] = useState([]);
  const { tokenIsPresent } = useContext(AuthContext);
  const { 
    toggleUpdForm, 
    toggleLogoutForm, 
    toggleDelAccountForm,
    handleUpdFormToggle, 
    handleLogoutFormToggle,
    handleDelAccountFormToggle 
  } = useContext(ToggleFormContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.url}/user/${userID}`, {
          method: 'GET',
          headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          next: {
            revalidate: 0
          }
        },);
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
        <div className='profile-pg-btns'>
          <button className='logout-btn' onClick={handleLogoutFormToggle}>Logout</button>
          <div className='account-delete-section'>
            <div className='account-delete-div'>
              <p>Account Termination</p>
              <button className='del-acc-btn logout-btn' onClick={handleDelAccountFormToggle}>Delete Account</button>
            </div>
            <div className='account-delete-info'>
              <FaInfoCircle />
              <p>
                You need to remove all the tasks yourself to proceed to terminate your account. <br />
                This is to ensure that users fully understand the consequences of deleting their accounts and helps prevent accidental deletions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='update-form-pg'>
        {toggleUpdForm && <UpdateProfile />}
        {toggleLogoutForm && <Logout />}
        {toggleDelAccountForm && <DeleteUser />}
      </div>
    </div>
  );
}
