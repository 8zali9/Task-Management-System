"use client"

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/TokenProvider';
import { ToggleFormContext } from '../utils/ToggleForm';
import ToastMsg from '../utils/ToastMsg'
import { IoMdAddCircleOutline } from "react-icons/io";
import AddTask from '../components/pageComponents/AddTask'
import DeleteTask from '../components/pageComponents/DeleteTask'
import config from '../config'

function fetchUserID(){
  const userID = localStorage.getItem('userID')
  return userID
}

function priorityColor (priority) {
  if (priority == 1) {
    return <ToastMsg msg="" color="rgb(76, 240, 76)" />
  } else if (priority == 2) {
    return <ToastMsg msg="" color="yellow" />
  } else {
    return <ToastMsg msg="" color="red" />
  }
}

export default function TasksPage() {
  const { toggleAddTaskForm, handleAddTaskFormToggle } = useContext(ToggleFormContext)

  const [tasks, setTasks] = useState([]);
  const userID = fetchUserID()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.url}/usertasks/${userID}`, {
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
              <div className='tasks-pri-deadline'>
                <p>{priorityColor(task.priority)}</p>
                <p className='task-deadline'><b>Deadline: </b>{task.deadline}</p>
              </div>
              <p className='name'><b>{task.taskName}</b></p>
              <p className='details'>{task.taskDetails}</p>
            </div>
            <DeleteTask taskID={task.taskID} />
          </div>
        ))}
        {toggleAddTaskForm && <AddTask className='add-task-form'/>}
      </div>
    </div>
  );
}
