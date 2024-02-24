"use client"

import { useContext, useState } from 'react';
import { AuthContext } from '../utils/TokenProvider';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

export default function AddTask() {
  const router = useRouter()

  const userID = localStorage.getItem('userID')
  const [taskName, setTaskName] = useState("")
  const [taskDetails, setTaskDetails] = useState("")
  const { token } = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`http://localhost:2424/api/usertasks/${userID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ taskName, taskDetails }),
      credentials: 'include'
    });
    const data = await response.json();
    if (response.status === 201) {
      router.push('/tasks')
      toast.dark("Task added.");
    }
    else{
      toast.dark("Problem adding task")
    }
  }

  const isDisabled = !taskName || !taskDetails;

  return (
    <div className='updateForm-pg'>
      <form className='update-form' onSubmit={handleFormSubmit}>
        <legend>Add task</legend>
        <input className='form-input'
          required
          placeholder='Task name'
          type='text'
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
        />
        <input className='form-input'
          required
          placeholder='Details'
          type='text'
          onChange={(e) => setTaskDetails(e.target.value)}
          value={taskDetails}
        />

        <button disabled={isDisabled} type='submit' className='login-form-btn'>Add</button>
      </form>
    </div>
  );
}
