"use client"

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/TokenProvider';
import { IoMdAddCircleOutline } from "react-icons/io";
import AddTask from '../components/AddTask'
import { useRouter } from 'next/navigation'

function fetchUserID(){
  const userID = localStorage.getItem('userID')
  return userID
}

export default function TasksPage() {
  // const { token } = useContext(AuthContext);
  // const router = useRouter()

  // if (!token) {
  //   router.push('/login')
  //   console.log(token)
  //   return (
  //     <div className='tasks-pg'>
  //       <div className='User Doesnt exist'>Routing to Login page...</div>
  //     </div>
  //   );
  // }

  const [tasks, setTasks] = useState([]);
  const [toggleAddTaskForm, setToggleAddTaskForm] = useState(false)
  const userID = fetchUserID()

  const handleFormToggle = () => {
    setToggleAddTaskForm(!toggleAddTaskForm)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:2424/api/usertasks/${userID}`, {
          method: 'GET',
          headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, [userID]);

  if ((!Array.isArray(tasks)) || (tasks.length === 0)) {
    return (
      <div className='tasks-pg'>
      {toggleAddTaskForm && <AddTask />}
      <div className='task-details'>
        <div className='pg-head'>
          <h3 className='pg-heading'>Tasks</h3>
          <button onClick={handleFormToggle}><IoMdAddCircleOutline fontSize='30px'/></button>
        </div>
        <p>No Tasks</p>
      </div>
    </div>
    );
  }

  return (
    <div className='tasks-pg'>
      <div className='task-details'>
        <div className='pg-head'>
          <h3 className='pg-heading'>Tasks</h3>
          <button onClick={handleFormToggle}><IoMdAddCircleOutline fontSize='30px'/></button>
        </div>
        {tasks.map((task) => (
          <div className='tasks-div' key={task.taskID}>
            <p className='name'><b>{task.taskName}</b></p>
            <p className='details'>{task.taskDetails}</p>
          </div>
        ))}
        {toggleAddTaskForm && <AddTask className='add-task-form'/>}
      </div>
    </div>
  );
}
