import React from 'react';
import API from "../api";   // ✅ Correct

export default function TaskList({ tasks, refresh }) {
  const act = async (id, action) => {
    if (action === 'complete') await API.post(`/tasks/${id}/complete`);
    if (action === 'revise') {
      const note = prompt('Revision note?') || '';
      await API.post(`/tasks/${id}/revise`, { note });
    }
    refresh?.();
  };

  return (
    <div>
      {tasks.map((t) => (
        <div key={t._id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 10, borderRadius: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{t.title}</strong>
            <span>Status: {t.status}</span>
          </div>
          <div>{t.description}</div>
          <div>Assigner: {t.assigner?.name} ({t.assigner?.email})</div>
          <div>Doer: {t.doer?.name} ({t.doer?.email})</div>
          {t.dueAt && <div>Due: {new Date(t.dueAt).toLocaleString()}</div>}
          {t.completedAt && <div>Completed: {new Date(t.completedAt).toLocaleString()}</div>}
          <div>Created: {new Date(t.createdAt).toLocaleString()}</div>
          {t.audioNoteUrl && (
            <div>Audio: <a href={t.audioNoteUrl} target="_blank" rel="noreferrer">open</a></div>
          )}
          <details>
            <summary>Timeline</summary>
            <ul>
              {t.actions?.map((a, idx) => (
                <li key={idx}>{a.type} by {a.by?.name || a.by} at {new Date(a.at).toLocaleString()} {a.note ? `- ${a.note}` : ''}</li>
              ))}
            </ul>
          </details>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => act(t._id, 'complete')}>Mark Complete</button>
            <button onClick={() => act(t._id, 'revise')} style={{ marginLeft: 8 }}>Request Revision</button>
          </div>
        </div>
      ))}
    </div>
  );
}