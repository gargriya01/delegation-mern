import { useEffect, useState } from "react";
import api from "../api";

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const load = async () => setTasks((await api.get("/tasks/my")).data);
  useEffect(() => { load(); }, []);

  const complete = async (id) => { await api.put(`/tasks/${id}/complete`); load(); };
  const revise = async (id) => { await api.put(`/tasks/${id}/revise`, { note: "User revised" }); load(); };

  return (
    <div className="page">
      <div className="card">
        <h2>My Tasks</h2>
        <table className="table">
          <thead><tr><th>ID</th><th>Description</th><th>Planned</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {tasks.map(t=>(
              <tr key={t._id}>
                <td>{t.taskId}</td>
                <td>{t.description}</td>
                <td>{t.plannedTime ? new Date(t.plannedTime).toLocaleString() : "-"}</td>
                <td className="badge">{t.status}</td>
                <td className="row-actions">
                  <button className="btn" onClick={()=>complete(t._id)}>Complete</button>
                  <button className="btn" onClick={()=>revise(t._id)}>Revise</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
