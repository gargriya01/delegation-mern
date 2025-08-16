import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      nav(data.user.role === "admin" ? "/admin" : "/user");
    } catch (e) {
      alert("Invalid credentials");
    }
  };

  const seed = async () => { await api.post("/auth/seed-admin"); alert("Admin: admin@demo.com / admin123"); };

  return (
    <div className="page">
      <div className="card" style={{maxWidth:420}}>
        <h2>Login</h2>
        <form onSubmit={submit}>
          <div className="form-row"><label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@example.com" required/>
          </div>
          <div className="form-row"><label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" required/>
          </div>
          <button className="btn" type="submit">Send Email OTP (demo = password)</button>
        </form>
        <p style={{marginTop:10}}>
          First time? <button className="btn" onClick={seed}>Create Demo Admin</button>
        </p>
      </div>
    </div>
  );
}
