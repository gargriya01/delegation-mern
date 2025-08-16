import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

export default function AdminDashboard() {
  return (
    <div className="page">
      <div className="card">
        <h2>Delegate Task</h2>
        <TaskForm />
        <hr style={{margin:"18px 0"}} />
        <TaskList admin />
      </div>
    </div>
  );
}
