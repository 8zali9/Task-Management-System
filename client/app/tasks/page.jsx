"use client"

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/TokenProvider';
import { ToggleFormContext } from '../utils/ToggleForm';
import { IoMdAddCircleOutline } from "react-icons/io";
import AddTask from '../components/pageComponents/AddTask'
import DeleteTask from '../components/pageComponents/DeleteTask'

function fetchUserID(){
  const userID = localStorage.getItem('userID')
  return userID
}

export default function TasksPage() {
  const { toggleAddTaskForm, handleAddTaskFormToggle } = useContext(ToggleFormContext)

  const [tasks, setTasks] = useState([]);
  const userID = fetchUserID()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:2424/api/usertasks/${userID}`, {
          method: 'GET',
          headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          next: {
            revalidate: 0
          }
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
          <button onClick={handleAddTaskFormToggle}><IoMdAddCircleOutline fontSize='30px'/></button>
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
          <button onClick={handleAddTaskFormToggle}><IoMdAddCircleOutline fontSize='30px'/></button>
        </div>
        {tasks.map((task) => (
          <div className='tasks-div' key={task.taskID}>
            <div className='tasks-part'>
              <p className='name'><b>{task.taskName}</b></p>
              <p className='details'>{task.taskDetails}</p>
              <p className='details'>{task.priority}</p>
              <p className='details'>{task.deadline}</p>
            </div>
            <DeleteTask taskID={task.taskID} />
          </div>
        ))}
        {toggleAddTaskForm && <AddTask className='add-task-form'/>}
      </div>
    </div>
  );
}
