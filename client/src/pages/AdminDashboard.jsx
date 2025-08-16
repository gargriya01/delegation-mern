import React, { useEffect, useState } from 'react';
import { API } from '../api.js';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import DoerList from '../components/DoerList.jsx';

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const { data } = await API.get('/tasks?status=');
    setTasks(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 16 }}>
      <div>
        <TaskForm onCreated={load} />
        <div style={{ marginTop: 16 }}>
          <DoerList />
        </div>
      </div>
      <div>
        <h3>All Tasks</h3>
        <TaskList tasks={tasks} refresh={load} />
      </div>
    </div>
  );
}