import { useEffect, useState } from "react";
import api from "../api";

export default function DoerManagement() {
  const [doers, setDoers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const load = async () => setDoers((await api.get("/users")).data);
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post("/users", { name, email });
    setName(""); setEmail(""); load();
  };

  return (
    <div className="page">
      <div className="card" style={{maxWidth:420}}>
        <h2>Add Doer</h2>
        <form onSubmit={add}>
          <div className="form-row">
            <label>Doer Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter doer's name" required/>
          </div>
          <div className="form-row">
            <label>Doer Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter doer's email" required/>
          </div>
          <button className="btn" type="submit">Add Doer</button>
        </form>
      </div>
    </div>
  );
}
