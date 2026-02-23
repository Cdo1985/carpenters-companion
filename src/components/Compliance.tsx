import React, { useState, useRef, useEffect } from 'react';
import { Camera, Trash2, Calendar, MapPin, CheckCircle, Info, Image as ImageIcon } from 'lucide-react';

interface ComplianceEvidence {
  id: number;
  area: string;
  date: string;
  notes: string;
  images: string[];
}

const Compliance = () => {
  const [evidenceList, setEvidenceList] = useState<ComplianceEvidence[]>(() => {
    const saved = localStorage.getItem('carpenters-compliance');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse compliance evidence from localStorage", e);
      }
    }
    return [];
  });

  const [formData, setFormData] = useState({
    area: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    images: [] as string[]
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('carpenters-compliance', JSON.stringify(evidenceList));
  }, [evidenceList]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const remainingSlots = 5 - formData.images.length;
      const filesToProcess = Array.from(files).slice(0, remainingSlots);

      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string].slice(0, 5)
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addEvidence = () => {
    if (!formData.area || formData.images.length === 0) return;
    const newEvidence: ComplianceEvidence = {
      id: Date.now(),
      ...formData
    };
    setEvidenceList([newEvidence, ...evidenceList]);
    setFormData({
      area: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      images: []
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const deleteEvidence = (id: number) => {
    setEvidenceList(evidenceList.filter(e => e.id !== id));
  };

  return (
    <div className="compliance-tracker">
      <div className="card" style={{ borderTop: '4px solid var(--success)' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
          <CheckCircle size={24} color="var(--success)" />
          <h3 style={{ margin: 0 }}>Compliance & Evidence Log</h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Document site compliance with area photos and dates to satisfy inspectors and site managers.
        </p>

        <div className="column gap-4 flex">
          <div className="flex gap-4">
            <div className="form-group" style={{ flex: 1 }}>
              <label>Area / Room Name</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  value={formData.area} 
                  onChange={e => setFormData({...formData, area: e.target.value})}
                  placeholder="e.g., Level 2 North Bulkhead" 
                  style={{ paddingLeft: '35px' }}
                />
              </div>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Date of Inspection</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  style={{ paddingLeft: '35px' }}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Compliance Notes / Description</label>
            <textarea 
              value={formData.notes} 
              onChange={e => setFormData({...formData, notes: e.target.value})}
              placeholder="Detail the compliance (e.g., FRL 60/60/60 verified, fire pillows installed)..." 
              rows={3} 
            />
          </div>

          <div className="form-group">
            <label>Evidence Photos (Max 5)</label>
            <input 
              type="file" 
              multiple 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
            
            <div className="flex flex-wrap gap-2" style={{ marginBottom: '10px' }}>
              {formData.images.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', width: '60px', height: '60px' }}>
                  <img src={img} alt="Evidence" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                  <button 
                    onClick={() => removeImage(idx)}
                    style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--danger)', color: 'white', borderRadius: '50%', padding: '2px', border: 'none', cursor: 'pointer' }}
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
              {formData.images.length < 5 && (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  style={{ width: '60px', height: '60px', background: '#333', border: '1px dashed #666', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', gap: '4px' }}
                >
                  <Camera size={16} />
                  <span style={{ fontSize: '0.6rem' }}>{formData.images.length}/5</span>
                </button>
              )}
            </div>
          </div>
          
          <button 
            onClick={addEvidence}
            disabled={!formData.area || formData.images.length === 0}
            style={{ 
              background: 'var(--success)', 
              color: '#fff', 
              padding: '14px', 
              fontWeight: 'bold', 
              fontSize: '1rem', 
              borderRadius: '8px',
              opacity: (!formData.area || formData.images.length === 0) ? 0.5 : 1,
              cursor: (!formData.area || formData.images.length === 0) ? 'not-allowed' : 'pointer'
            }}
          >
            Log Compliance Evidence
          </button>
        </div>
      </div>

      <div className="column gap-4 flex" style={{ marginTop: '2rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ImageIcon size={20} color="var(--primary)" /> Previous Evidence
        </h3>
        
        {evidenceList.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            No evidence logs yet. Document your work to ensure smooth handovers!
          </div>
        ) : (
          evidenceList.map(e => (
            <div key={e.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <h4 style={{ margin: 0, color: 'var(--accent)' }}>{e.area}</h4>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <Calendar size={12} /> {e.date}
                  </div>
                </div>
                <button 
                  onClick={() => deleteEvidence(e.id)}
                  style={{ background: 'transparent', padding: '4px' }}
                >
                  <Trash2 size={18} color="var(--danger)" />
                </button>
              </div>
              
              {e.notes && (
                <p style={{ fontSize: '0.85rem', margin: '10px 0', color: 'var(--text-main)' }}>{e.notes}</p>
              )}

              <div className="flex flex-wrap gap-2" style={{ marginTop: '10px' }}>
                {e.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`Evidence ${idx + 1}`} 
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => window.open(img, '_blank')}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ padding: '1rem', textAlign: 'center', opacity: 0.6 }}>
        <p style={{ fontSize: '0.75rem' }}>
          <Info size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
          Log evidence for handover and insurance purposes. Compliance documentation reduces liability.
        </p>
      </div>
    </div>
  );
};

export default Compliance;
