import { useEffect, useState } from "react";
import api from "../api";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const load = async () => {
    const { data } = await api.get("/tasks", { params: { status: "Pending" } });
    setTasks(data);
  };
  useEffect(() => { load(); }, []);

  return (
    <div className="page">
      <div className="card">
        <h2>Not Completed Task Dashboard</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Task ID</th><th>Task Description</th><th>Planned Time</th>
              <th>Assigner Email</th><th>Timestamp</th><th>Status</th><th>Completed Time</th>
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
                <td><span className="badge">{t.status}</span></td>
                <td>{t.completedAt ? new Date(t.completedAt).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
