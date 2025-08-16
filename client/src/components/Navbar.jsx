import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { auth, logout } = useAuth();
  const { pathname } = useLocation();
  const Tab = ({ to, children }) => (
    <Link className={`tab ${pathname === to ? "active" : ""}`} to={to}>{children}</Link>
  );

  return (
    <div className="navbar">
      {auth?.user?.role === "admin" && (
        <>
          <Tab to="/dashboard">Task Dashboard</Tab>
          <Tab to="/follow-up">Task Follow Up</Tab>
          <Tab to="/doers">Doer Management</Tab>
          <Tab to="/admin">Delegate Task</Tab>
        </>
      )}
      {auth?.user?.role === "user" && <Tab to="/user">My Tasks</Tab>}
      <div className="spacer" />
      {auth ? (
        <button className="btn" onClick={logout}>Logout</button>
      ) : (
        <Link className="btn" to="/login">Login</Link>
      )}
    </div>
  );
}
