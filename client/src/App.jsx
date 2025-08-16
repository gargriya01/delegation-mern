import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import DoerManagement from "./pages/DoerManagement.jsx";
import TaskFollowUp from "./pages/TaskFollowUp.jsx";
import TaskDashboard from "./pages/TaskDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/doers" element={<DoerManagement />} />
          <Route path="/follow-up" element={<TaskFollowUp />} />
          <Route path="/dashboard" element={<TaskDashboard />} />
        </Route>

        <Route element={<ProtectedRoute role="user" />}>
          <Route path="/user" element={<UserDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}
