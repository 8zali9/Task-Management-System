"use client"

import { AuthContext } from '../../utils/ToggleForm';
import { MdRemoveDone } from "react-icons/md";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

export default function DeleteTask({ taskID }) {
  const router = useRouter()

  const userID = localStorage.getItem('userID')
  // const { token } = useContext(AuthContext);

  const handleDeleteFormSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`http://localhost:2424/api/usertasks/${userID}/${taskID}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    });
    const data = await response.json();
    if (response.status === 200) {
      router.push('/profile')
      setTimeout(async () => {
        await router.push('/tasks');
      }, 100);
      toast.dark("Task finished");
    }
    else{
      toast.dark("Problem removing task")
    }
  }

  return (
    <div className='delete-task'>
      <form className='delete-form' onSubmit={handleDeleteFormSubmit}>
        <button type='submit' className='delete-form-btn'><MdRemoveDone /></button>
      </form>
    </div>
  );
}
