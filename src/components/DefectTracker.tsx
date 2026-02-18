import React, { useState } from 'react';
import { AlertTriangle, CheckSquare, Trash2, User } from 'lucide-react';

const DefectTracker = () => {
  const [defects, setDefects] = useState([
    { id: 1, trade: 'Concreter', issue: 'Slab out of level (> 5mm over 3m)', resolved: false },
    { id: 2, trade: 'Plumber', issue: 'Pipes through structural studs (noggin needed)', resolved: false },
    { id: 3, trade: 'Sparky', issue: 'Holes too large in top plate', resolved: false },
    { id: 4, trade: 'Site Mgr', issue: 'Material not on site / Wrong delivery', resolved: false },
  ]);

  const toggleDefect = (id: number) => {
    setDefects(defects.map(d => d.id === id ? { ...d, resolved: !d.resolved } : d));
  };

  const removeDefect = (id: number) => {
    setDefects(defects.filter(d => d.id !== id));
  };

  return (
    <div className="defect-tracker">
      <div className="card">
        <h3>Site Trade Defects</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>"Not My Job" - Track issues from other trades that impact your work.</p>
        <div className="column flex" style={{ marginTop: '1rem' }}>
          {defects.map((d) => (
            <div key={d.id} className="defect-item">
              <div 
                onClick={() => toggleDefect(d.id)} 
                style={{ cursor: 'pointer', flexShrink: 0, marginTop: '2px' }}
              >
                <CheckSquare 
                  size={20} 
                  color={d.resolved ? 'var(--success)' : 'var(--text-muted)'} 
                />
              </div>
              <div className="defect-meta flex column gap-2" style={{ flex: 1 }}>
                <div className="flex items-center">
                  <span className="trade-tag">{d.trade}</span>
                  <AlertTriangle size={14} color={d.resolved ? 'var(--text-muted)' : 'var(--danger)'} style={{ marginLeft: '4px' }} />
                </div>
                <span style={{ 
                  fontSize: '0.9rem', 
                  textDecoration: d.resolved ? 'line-through' : 'none',
                  color: d.resolved ? 'var(--text-muted)' : 'var(--text-main)'
                }}>
                  {d.issue}
                </span>
              </div>
              <button 
                onClick={() => removeDefect(d.id)} 
                style={{ background: 'transparent', padding: '4px' }}
              >
                <Trash2 size={16} color="var(--danger)" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Report New Issue</h3>
        <div className="column gap-4 flex">
          <div className="form-group">
            <label>Trade Responsible</label>
            <input type="text" placeholder="e.g., Plumber, Sparky" />
          </div>
          <div className="form-group">
            <label>Description of Issue</label>
            <textarea placeholder="Describe the issue impacting your work..." rows={3} style={{ background: 'var(--bg-input)', border: '1px solid #444', color: 'white', padding: '8px', borderRadius: '4px', width: '100%' }} />
          </div>
          <button style={{ background: 'var(--primary)', color: '#000', padding: '12px', fontWeight: 'bold' }}>
            Log Defect
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefectTracker;
