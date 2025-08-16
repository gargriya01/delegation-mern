import React, { useEffect, useState } from 'react';
import { API } from '../api.js';
import TaskList from '../components/TaskList.jsx';

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const load = async () => {
    const { data } = await API.get('/tasks/mine');
    setTasks(data);
  };
  useEffect(() => { load(); }, []);
  return (
    <div style={{ padding: 16 }}>
      <h3>My Tasks</h3>
      <TaskList tasks={tasks} refresh={load} />
    </div>
  );
}