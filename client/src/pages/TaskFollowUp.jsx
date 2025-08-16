import { useEffect, useState } from "react";
import api from "../api";

export default function TaskFollowUp() {
  const [tasks, setTasks] = useState([]);
  const load = async (range="today") => {
    const { data } = await api.get("/tasks/followup", { params: { range } });
    setTasks(data);
  };
  useEffect(() => { load("all"); }, []);

  const complete = async (id) => { await api.put(`/tasks/${id}/complete`); load("all"); };
  const revise = async (id) => {
    const note = prompt("Add revise note (optional)");
    await api.put(`/tasks/${id}/revise`, { note });
    load("all");
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Task Follow-Up Dashboard</h2>
        <div className="filters">
          <button className="btn" onClick={()=>load("today")}>Today's Tasks</button>
          <button className="btn" onClick={()=>load("next7")}>Next 7 Days Tasks</button>
          <button className="btn" onClick={()=>load("all")}>Show All Tasks</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Task ID</th><th>Task Description</th><th>Planned Time</th>
              <th>Assigner Email</th><th>Timestamp</th><th>Doer Name</th>
              <th>Status</th><th>Completed Time</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t._id}>
                <td>{t.taskId}</td>
                <td>{t.description}</td>
                <td>{t.plannedTime ? new Date(t.plannedTime).toLocaleString() : "-"}</td>
                <td>{t.assignerEmail}</td>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
                <td>{t.assignee?.name || "No Doer Assigned"}</td>
                <td className="badge">{t.status}</td>
                <td>{t.completedAt ? new Date(t.completedAt).toLocaleString() : "-"}</td>
                <td className="row-actions">
                  <button className="btn" onClick={()=>complete(t._id)}>Mark as Completed</button>
                  <button className="btn" onClick={()=>revise(t._id)}>Add Re-issue</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
