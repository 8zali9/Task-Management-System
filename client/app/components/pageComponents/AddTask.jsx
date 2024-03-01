"use client"

import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/TokenProvider';
import { ToggleFormContext } from '../../utils/ToggleForm';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

export default function AddTask() {
  const { handleAddTaskFormToggle } = useContext(ToggleFormContext)

  const router = useRouter()

  const userID = localStorage.getItem('userID')
  const [taskName, setTaskName] = useState("")
  const [taskDetails, setTaskDetails] = useState("")
  // const { token } = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`http://localhost:2424/api/usertasks/${userID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ taskName, taskDetails }),
      credentials: 'include'
    });
    const data = await response.json();
    if (response.status === 201) {
      router.push('/profile')
      setTimeout(async () => {
        await router.push('/tasks');
      }, 100);
      toast.dark("Task added.");
    }
    else{
      toast.dark("Problem adding task")
    }
    
    handleAddTaskFormToggle();
  }

  const isDisabled = !taskName || !taskDetails;

  return (
    <div className='general-form-pg'>
      <form className='general-form' onSubmit={handleFormSubmit}>
        <legend>Add task</legend>
        <input className='general-form-input'
          required
          placeholder='Task name'
          type='text'
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
        />
        <input className='general-form-input'
          required
          placeholder='Details'
          type='text'
          onChange={(e) => setTaskDetails(e.target.value)}
          value={taskDetails}
        />

        <div className='general-form-btns-div'>
          <button disabled={isDisabled} type='submit' className='general-form-btn'>Add</button>
          <button onClick={handleAddTaskFormToggle} type='submit' className='general-form-btn cancel-btn'>Cancel</button>
        </div>
      </form>
    </div>
  );
}
