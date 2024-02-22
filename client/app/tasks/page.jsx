"use client"

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/TokenProvider';

export default function TasksPage() {
  const userID = localStorage.getItem('userID')
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:2424/api/usertasks/${userID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
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
  }, [userID, token]);

  if ((!Array.isArray(tasks)) || (tasks.length === 0)) {
    return (
      <div className='User Doesnt exist'>Problem fetching details.</div>
    );
  }

  return (
    <div className='tasks-pg'>
      <div className='task-details'>
        {tasks.map((task) => (
          <div key={task.taskID}>
            <p className='name'>Task Name: {task.taskName}</p>
            <p className='details'>Details: {task.taskDetails}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
