import React, { useState, useRef, useEffect } from 'react';
import { AlertTriangle, CheckSquare, Trash2, Info, Zap, MapPin, Flag, ChevronDown, ChevronUp, Camera } from 'lucide-react';

interface Defect {
  id: number;
  trade: string;
  issue: string;
  location: string;
  priority: 'Low' | 'Medium' | 'High';
  resolved: boolean;
  category: string;
  image?: string;
}

interface DefectForm {
  trade: string;
  issue: string;
  location: string;
  priority: 'Low' | 'Medium' | 'High';
  category: string;
  image?: string;
}

const DefectTracker = () => {
  const [defects, setDefects] = useState<Defect[]>(() => {
    const saved = localStorage.getItem('carpenters-defects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse defects from localStorage", e);
      }
    }
    return [
      { id: 1, trade: 'Concreter', issue: 'Slab out of level (> 5mm over 3m)', location: 'Garage', priority: 'High', resolved: false, category: 'Structural' },
      { id: 2, trade: 'Plumber', issue: 'Pipes through structural studs (noggin needed)', location: 'Ensuite', priority: 'Medium', resolved: false, category: 'Rough-in' },
      { id: 3, trade: 'Sparky', issue: 'Holes too large in top plate', location: 'Kitchen', priority: 'Medium', resolved: false, category: 'Rough-in' },
      { id: 4, trade: 'Site Mgr', issue: 'Wrong timber delivery (F7 vs MGP10)', location: 'Site Front', priority: 'High', resolved: false, category: 'Materials' },
    ];
  });

  const [showTips, setShowTips] = useState(() => {
    return localStorage.getItem('carpenters-defects-showTips') === 'true';
  });

  const [formData, setFormData] = useState<DefectForm>(() => {
    const saved = localStorage.getItem('carpenters-defects-form');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed;
      } catch (e) {
        console.error("Failed to parse form from localStorage", e);
      }
    }
    return {
      trade: '',
      issue: '',
      location: '',
      priority: 'Medium',
      category: 'General',
      image: undefined
    };
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('carpenters-defects', JSON.stringify(defects));
  }, [defects]);

  useEffect(() => {
    localStorage.setItem('carpenters-defects-form', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('carpenters-defects-showTips', String(showTips));
  }, [showTips]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev: DefectForm) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDefect = (id: number) => {
    setDefects(defects.map(d => d.id === id ? { ...d, resolved: !d.resolved } : d));
  };

  const removeDefect = (id: number) => {
    setDefects(defects.filter(d => d.id !== id));
  };

  const addDefect = () => {
    if (!formData.trade || !formData.issue) return;
    const newDefect: Defect = {
      id: Date.now(),
      ...formData,
      resolved: false
    };
    setDefects([newDefect, ...defects]);
    setFormData({ trade: '', issue: '', location: '', priority: 'Medium' as 'Low' | 'Medium' | 'High', category: 'General', image: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addTemplate = (template: any) => {
    setFormData({ ...formData, ...template });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'var(--danger)';
      case 'Medium': return 'var(--primary)';
      default: return 'var(--text-muted)';
    }
  };

  const vbaStandards = [
    { title: 'Plumbness', text: 'Wall frames must be plumb within 4mm over a 2.4m height (VBA 2015).' },
    { title: 'Slab Level', text: 'Floor levelness must not exceed 5mm deviation over 3m (VBA 2015).' },
    { title: 'Door Gaps', text: 'Internal door margins should be consistent, typically 2-3mm.' },
    { title: 'Noggins', text: 'Noggins are required at maximum 1350mm centers for wall height > 2.4m.' },
    { title: 'Supplier Rule', text: 'Report delivery defects within 7 days (Bunnings/Bowens/Dahlsens Policy).' }
  ];

  const templates = [
    { trade: 'Plumber', issue: 'Missing noggin for tap set', category: 'Rough-in', priority: 'Medium' },
    { trade: 'Plasterer', issue: 'Standard board used instead of Aquachek™ in wet area', category: 'Materials', priority: 'High' },
    { trade: 'Plasterer', issue: 'Non-fire rated mastic used for Fyrchek™ penetration', category: 'Materials', priority: 'High' },
    { trade: 'Deliveries', issue: 'Wrong cornice profile (Cove vs Aria)', category: 'Materials', priority: 'Low' },
    { trade: 'Concreter', issue: 'Slab edge rebate too shallow', category: 'Structural', priority: 'High' }
  ];

  return (
    <div className="defect-tracker">
      {/* VBA Standards & Tips Section */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
        <div 
          className="flex justify-between items-center" 
          style={{ cursor: 'pointer' }}
          onClick={() => setShowTips(!showTips)}
        >
          <div className="flex items-center gap-2">
            <Info size={20} color="var(--accent)" />
            <h3 style={{ margin: 0, color: 'var(--accent)' }}>VBA Standards & Pro Tips</h3>
          </div>
          {showTips ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {showTips && (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Reference guide for common Melbourne site issues based on the VBA Guide to Standards & Tolerances 2015.
            </p>
            <div className="column gap-2 flex">
              {vbaStandards.map((tip, i) => (
                <div key={i} style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '4px', borderLeft: '2px solid var(--accent)' }}>
                  <strong style={{ fontSize: '0.85rem', display: 'block' }}>{tip.title}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{tip.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Templates */}
      <div className="card">
        <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
          <Zap size={20} color="var(--primary)" />
          <h3 style={{ margin: 0 }}>Quick Templates</h3>
        </div>
        <div className="flex flex-wrap gap-2" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {templates.map((t, i) => (
            <button 
              key={i} 
              onClick={() => addTemplate(t)}
              style={{ background: '#333', color: 'white', padding: '6px 10px', fontSize: '0.75rem', borderRadius: '20px' }}
            >
              + {t.trade}: {t.issue}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Site Trade Defects</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Track issues that impact your workflow or structural integrity.</p>
        
        <div className="column flex">
          {defects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No defects logged. Site is looking clean!</div>
          ) : (
            defects.map((d) => (
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="trade-tag">{d.trade}</span>
                      <span className="trade-tag" style={{ background: 'var(--bg-input)' }}>{d.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flag size={14} color={getPriorityColor(d.priority)} />
                      <span style={{ fontSize: '0.7rem', color: getPriorityColor(d.priority), fontWeight: 'bold' }}>{d.priority}</span>
                    </div>
                  </div>
                  <span style={{ 
                    fontSize: '0.95rem', 
                    fontWeight: 'bold',
                    textDecoration: d.resolved ? 'line-through' : 'none',
                    color: d.resolved ? 'var(--text-muted)' : 'var(--text-main)'
                  }}>
                    {d.issue}
                  </span>
                  {d.image && (
                    <img src={d.image} alt="Defect" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }} />
                  )}
                  <div className="flex items-center gap-1" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <MapPin size={12} /> {d.location || 'Not Specified'}
                  </div>
                </div>
                <button 
                  onClick={() => removeDefect(d.id)} 
                  style={{ background: 'transparent', padding: '4px', marginLeft: '8px' }}
                >
                  <Trash2 size={18} color="var(--danger)" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
        <h3>Log New Issue</h3>
        <div className="column gap-4 flex">
          <div className="flex gap-4">
            <div className="form-group" style={{ flex: 1 }}>
              <label>Trade Responsible</label>
              <input 
                type="text" 
                value={formData.trade} 
                onChange={e => setFormData({...formData, trade: e.target.value})}
                placeholder="e.g., Plumber" 
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option>General</option>
                <option>Structural</option>
                <option>Rough-in</option>
                <option>Fixing</option>
                <option>Materials</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="form-group" style={{ flex: 1 }}>
              <label>Location / Room</label>
              <input 
                type="text" 
                value={formData.location} 
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="e.g., Master Bed" 
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Priority</label>
              <select 
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value as any})}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description of Issue</label>
            <textarea 
              value={formData.issue} 
              onChange={e => setFormData({...formData, issue: e.target.value})}
              placeholder="Describe the issue impacting your work..." 
              rows={3} 
            />
          </div>

          <div className="form-group">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{ background: '#333', color: 'white', padding: '10px', width: '100%', borderRadius: '6px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Camera size={20} />
              {formData.image ? 'Image Attached' : 'Attach Photo of Defect'}
            </button>
            {formData.image && (
              <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />
            )}
          </div>
          
          <button 
            onClick={addDefect}
            style={{ background: 'var(--primary)', color: '#000', padding: '14px', fontWeight: 'bold', fontSize: '1rem', borderRadius: '8px' }}
          >
            Log Defect
          </button>
        </div>
      </div>

      <div style={{ padding: '1rem', textAlign: 'center', opacity: 0.6 }}>
        <p style={{ fontSize: '0.75rem' }}>
          <Info size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
          All standards referenced from VBA Guide to Standards & Tolerances 2015 and Melbourne building regulations.
        </p>
      </div>
    </div>
  );
};

export default DefectTracker;
