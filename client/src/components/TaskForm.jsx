import React, { useEffect, useState } from 'react';
import { API } from '../api.js';

export default function TaskForm({ onCreated }) {
  const [doers, setDoers] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', audioNoteUrl: '', dueAt: '', doer: '' });

  useEffect(() => {
    API.get('/users/doers').then((res) => setDoers(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, dueAt: form.dueAt ? new Date(form.dueAt) : null };
    const { data } = await API.post('/tasks', payload);
    onCreated?.(data);
    setForm({ title: '', description: '', audioNoteUrl: '', dueAt: '', doer: '' });
  };

  return (
    <form onSubmit={submit} style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
      <h3>Delegate Task</h3>
      <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <br />
      <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <br />
      <input placeholder="Audio Note URL (optional)" value={form.audioNoteUrl} onChange={(e) => setForm({ ...form, audioNoteUrl: e.target.value })} />
      <br />
      <input type="datetime-local" value={form.dueAt} onChange={(e) => setForm({ ...form, dueAt: e.target.value })} />
      <br />
      <select value={form.doer} onChange={(e) => setForm({ ...form, doer: e.target.value })} required>
        <option value="">Select Doer</option>
        {doers.map((d) => (
          <option key={d._id} value={d._id}>{d.name} – {d.email}</option>
        ))}
      </select>
      <br />
      <button type="submit">Create Task</button>
    </form>
  );
}