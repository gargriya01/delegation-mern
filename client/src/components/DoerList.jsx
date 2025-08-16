import React, { useEffect, useState } from 'react';
import { API } from '../api.js';

export default function DoerList() {
  const [doers, setDoers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const load = async () => {
    const { data } = await API.get('/users/doers');
    setDoers(data);
  };

  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await API.post('/users/doers', form);
    setForm({ name: '', email: '', password: '' });
    load();
  };

  return (
    <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
      <h3>Doers</h3>
      <form onSubmit={add}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Temp Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Add Doer</button>
      </form>
      <ul>
        {doers.map((d) => (
          <li key={d._id}>{d.name} – {d.email}</li>
        ))}
      </ul>
    </div>
  );
}