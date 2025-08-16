import { useEffect, useRef, useState } from "react";
import API from "../api";   // ✅ Correct

export default function TaskForm() {
  const [users, setUsers] = useState([]);
  const [description, setDescription] = useState("");
  const [plannedTime, setPlannedTime] = useState("");
  const [assignee, setAssignee] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => { api.get("/users").then(r=>setUsers(r.data)); }, []);

  const startRec = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRef.current = new MediaRecorder(stream);
    chunksRef.current = [];
    mediaRef.current.ondataavailable = e => chunksRef.current.push(e.data);
    mediaRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const file = new File([blob], "note.webm", { type: "audio/webm" });
      const fd = new FormData(); fd.append("audio", file);
      const { data } = await api.post("/uploads/audio", fd, { headers: { "Content-Type":"multipart/form-data" }});
      setAudioUrl(data.url);
    };
    mediaRef.current.start();
  };
  const stopRec = () => mediaRef.current?.state === "recording" && mediaRef.current.stop();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", { description, plannedTime, assignee, audioUrl });
    setDescription(""); setPlannedTime(""); setAssignee(""); setAudioUrl("");
    alert("Task created");
  };

  return (
    <form onSubmit={submit}>
      <h3>Task Delegation</h3>
      <div className="form-row">
        <label>Task Description</label>
        <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Enter task description" required/>
      </div>
      <div className="form-row">
        <label>Date & Time to Accomplish</label>
        <input type="datetime-local" value={plannedTime} onChange={e=>setPlannedTime(e.target.value)} required/>
      </div>
      <div className="form-row">
        <label>Assign To (Doer)</label>
        <select required value={assignee} onChange={e=>setAssignee(e.target.value)}>
          <option value="">Select a doer...</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
        </select>
      </div>
      <div className="form-row">
        <label>Audio Note</label>
        <div className="row-actions">
          <button className="btn" type="button" onClick={startRec}>Start Recording</button>
          <button className="btn" type="button" onClick={stopRec}>Stop</button>
          {audioUrl && <span className="badge">Recorded</span>}
        </div>
      </div>
      <button className="btn" type="submit">Submit Task</button>
    </form>
  );
}
