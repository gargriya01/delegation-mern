import { useState } from "react";
import api from "../api";

export default function DoerList({ doers, onChanged }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const startEdit = (d) => { setEditing(d._id); setForm({ name: d.name, email: d.email }); };
  const save = async (id) => { await api.put(`/users/${id}`, form); setEditing(null); onChanged(); };
  const remove = async (id) => { if (confirm("Delete doer?")) { await api.delete(`/users/${id}`); onChanged(); } };

  return (
    <table className="table">
      <thead><tr><th>Doer Name</th><th>Doer Email</th><th>Actions</th></tr></thead>
      <tbody>
      {doers.map(d => (
        <tr key={d._id}>
          <td>{editing===d._id ? <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/> : d.name}</td>
          <td>{editing===d._id ? <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/> : d.email}</td>
          <td className="row-actions">
            {editing===d._id ? (
              <>
                <button className="btn" onClick={()=>save(d._id)}>Save</button>
                <button className="btn" onClick={()=>setEditing(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button className="btn" onClick={()=>startEdit(d)}>Edit</button>
                <button className="btn" onClick={()=>remove(d._id)}>Delete</button>
              </>
            )}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}
