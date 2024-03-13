"use client"

import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/TokenProvider';
import { ToggleFormContext } from '../../utils/ToggleForm';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import ToastMsg from '../../utils/ToastMsg'

export default function AddTask() {
  const { handleAddTaskFormToggle } = useContext(ToggleFormContext)

  const router = useRouter()

  const userID = localStorage.getItem('userID')
  const [taskName, setTaskName] = useState("")
  const [taskDetails, setTaskDetails] = useState("")
  const [priority, setPriority] = useState("1")
  const [deadline, setDeadline] = useState("")
  // const { token } = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`http://localhost:2424/api/usertasks/${userID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ taskName, taskDetails, priority, deadline }),
      credentials: 'include'
    });
    const data = await response.json();
    if (response.status === 201) {
      router.push('/profile')
      setTimeout(async () => {
        await router.push('/tasks');
      }, 100);
      toast.dark(<ToastMsg msg={"Task Added"} color={"rgb(76, 240, 76)"} />);
    }
    else{
      toast.dark(<ToastMsg msg={"Problem adding task"} color={"red"} />);
    }
    
    handleAddTaskFormToggle();
  }

  const isDisabled = !taskName || !taskDetails;

  return (
    <div className='general-form-pg'>
      <form className='general-form task-form' onSubmit={handleFormSubmit}>
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

        <div className='general-form-input-range-div'>
          <label htmlFor="date-input">Deadline</label>
          <input className='general-form-input date-input' 
            required
            type="datetime-local"
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className='general-form-input-range-div'>
          <label htmlFor="range-input">Intensity</label>
          <input className='general-form-input range-input'
            required
            min="1"
            max="3"
            step="1"
            type='range'
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>

        <div className='general-form-btns-div'>
          <button disabled={isDisabled} type='submit' className='general-form-btn'>Add</button>
          <button onClick={handleAddTaskFormToggle} className='general-form-btn cancel-btn'>Cancel</button>
        </div>
      </form>
    </div>
  );
}
