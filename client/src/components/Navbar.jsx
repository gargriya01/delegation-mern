import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
      <Link to="/">Home</Link>
      <span style={{ margin: '0 12px' }}>|</span>
      {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
      {user?.role === 'user' && <Link to="/me">My Tasks</Link>}
      <span style={{ float: 'right' }}>
        {user ? (
          <>
            <strong style={{ marginRight: 8 }}>{user.name} ({user.role})</strong>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </span>
    </nav>
  );
}