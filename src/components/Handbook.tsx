import React, { useState } from 'react';
import { Book, Shield, Zap } from 'lucide-react';

const Handbook = () => {
  const [activeTab, setActiveTab] = useState<'timber' | 'steel' | 'plaster' | 'ceilings' | 'commercial' | 'general'>('timber');

  const ceilingData = [
    { type: 'Furring Channel (28mm)', maxSpan: '1200mm', spacing: '600mm', notes: 'Standard grid' },
    { type: 'Main Bar (38mm)', maxSpan: '1200mm', spacing: '1200mm', notes: 'Key-lock system' },
    { type: 'Top Cross Rail', maxSpan: '1200mm', spacing: '1200mm', notes: 'Commercial grid' },
    { type: 'Direct Fix Clip', maxSpan: '1200mm', spacing: '900-1200mm', notes: 'Fixed to timber/concrete' },
  ];

  const insulationData = [
    { zone: 'Climate Zone 1-3', requirement: 'R4.1', type: 'Ceiling' },
    { zone: 'Climate Zone 4-6', requirement: 'R5.1', type: 'Ceiling' },
    { zone: 'Climate Zone 7-8', requirement: 'R6.3', type: 'Ceiling' },
    { type: 'Acoustic (Sound)', requirement: 'RW 45+', notes: 'High density batts' },
  ];

  const timberData = [
    { type: 'Stud spacing (max)', single: '600mm', double: '450mm', unit: 'mm' },
    { type: 'Noggins (max)', vertical: '1350mm', notes: 'AS 1684.2', unit: 'mm' },
    { type: 'Wall framing fixes', method: '2 / 75 x 3.05mm', notes: 'Hand or machine driven', unit: '' },
    { type: 'Truss fixing', method: 'Truss grips / Triple grips', notes: 'Refer to truss layout', unit: '' },
  ];

  const plasterData = [
    { type: 'Standard 10mm', use: 'General Walls', screwSpacing: '300mm edges / 600mm field', notes: 'Standard residential' },
    { type: 'Wet Area (Blue)', use: 'Bathrooms / Laundry', screwSpacing: '200mm edges / 300mm field', notes: 'Moisture resistant' },
    { type: 'Fire Rated (Pink)', use: 'Garages / Boundaries', screwSpacing: '200mm centers', notes: 'Specific screw types req.' },
    { type: 'Sound Rated (Yellow)', use: 'Theatres / Bedrooms', screwSpacing: '300mm centers', notes: 'High density board' },
    { type: 'Impact Rated', use: 'Hallways / Schools', screwSpacing: '200mm centers', notes: 'Reinforced core' },
  ];

  const steelData = [
    { item: '64mm C-Stud 0.50 BMT', height: '2700mm', spacing: '600mm', brand: 'Rondo/Studco' },
    { item: '64mm C-Stud 0.75 BMT', height: '3200mm', spacing: '600mm', brand: 'Rondo/Studco' },
    { item: '92mm C-Stud 0.75 BMT', height: '4500mm', spacing: '600mm', brand: 'Rondo/Studco' },
    { item: 'Tracks (Top/Bottom)', type: 'Deflection / Standard', brand: 'Rondo/Studco' },
  ];

  const commercialGuides = [
    { title: 'Bulkheads', detail: 'Use Rondo DUO or KEY-LOCK for complex shapes. Ensure hangers @ 1200mm centers.' },
    { title: 'Seismic Joints', detail: 'Required every 9-12m in long walls. Use specialized seismic clips for head tracks.' },
    { title: 'Fire-Rated Walls', detail: 'Ensure 16mm Fire-rated plasterboard with 10mm gap at top for deflection tracks.' },
    { title: 'Sound Insulation', detail: 'Use Studco Resilient Mounts (M237R) to isolate framing from structure.' },
  ];

  return (
    <div className="handbook">
      <div className="flex gap-2" style={{ marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', whiteSpace: 'nowrap' }}>
        <button 
          onClick={() => setActiveTab('timber')} 
          style={{ 
            background: activeTab === 'timber' ? 'var(--primary)' : '#333',
            color: activeTab === 'timber' ? '#000' : 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            flexShrink: 0
          }}>
          AS 1684 Timber
        </button>
        <button 
          onClick={() => setActiveTab('steel')} 
          style={{ 
            background: activeTab === 'steel' ? 'var(--primary)' : '#333',
            color: activeTab === 'steel' ? '#000' : 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            flexShrink: 0
          }}>
          Steel Framing
        </button>
        <button 
          onClick={() => setActiveTab('plaster')} 
          style={{ 
            background: activeTab === 'plaster' ? 'var(--primary)' : '#333',
            color: activeTab === 'plaster' ? '#000' : 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            flexShrink: 0
          }}>
          Plaster & Sheeting
        </button>
        <button 
          onClick={() => setActiveTab('ceilings')} 
          style={{ 
            background: activeTab === 'ceilings' ? 'var(--primary)' : '#333',
            color: activeTab === 'ceilings' ? '#000' : 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            flexShrink: 0
          }}>
          Ceiling Systems
        </button>
        <button 
          onClick={() => setActiveTab('commercial')} 
          style={{ 
            background: activeTab === 'commercial' ? 'var(--primary)' : '#333',
            color: activeTab === 'commercial' ? '#000' : 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            flexShrink: 0
          }}>
          Commercial Guides
        </button>
        <button 
          onClick={() => setActiveTab('general')} 
          style={{ 
            background: activeTab === 'general' ? 'var(--primary)' : '#333',
            color: activeTab === 'general' ? '#000' : 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            flexShrink: 0
          }}>
          Standards
        </button>
      </div>

      {activeTab === 'timber' && (
        <div className="card">
          <h3>AS 1684 Residential Timber</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Australian Standard for light timber-framed construction.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Standard</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {timberData.map((d, i) => (
                <tr key={i}>
                  <td>{d.type}</td>
                  <td>{d.single || d.vertical || d.method}</td>
                  <td>{d.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#33333333', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={16} color="var(--primary)" /> Pro Tip
            </h4>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>
              Always check the wind classification (N1-N4) before selecting span tables. Most residential is N2.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'steel' && (
        <div className="card">
          <h3>Rondo & Studco Steel Systems</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Commercial wall and ceiling specifications.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Max Height</th>
                <th>Spacing</th>
              </tr>
            </thead>
            <tbody>
              {steelData.map((d, i) => (
                <tr key={i}>
                  <td>
                    {d.item}
                    <div style={{ marginTop: '4px' }}>
                      <span className="badge badge-rondo">Rondo</span>
                      <span className="badge badge-studco" style={{ marginLeft: '4px' }}>Studco</span>
                    </div>
                  </td>
                  <td>{d.height || 'N/A'}</td>
                  <td>{d.spacing || d.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#33333333', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={16} color="var(--primary)" /> Steel Rule
            </h4>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>
              Ensure tracks are fixed at 600mm centers max. Use 0.75 BMT for heights over 2.7m.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'plaster' && (
        <div className="card">
          <h3>Plasterboard & Sheeting Standards</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Common board types and installation requirements.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Board Type</th>
                <th>Typical Use</th>
                <th>Screw Spacing</th>
              </tr>
            </thead>
            <tbody>
              {plasterData.map((d, i) => (
                <tr key={i}>
                  <td>
                    {d.type}
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{d.notes}</div>
                  </td>
                  <td>{d.use}</td>
                  <td>{d.screwSpacing}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#33333333', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={16} color="var(--primary)" /> Installation Tip
            </h4>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>
              Leave a 10mm gap at the floor for moisture protection. For fire-rated walls, ensure all joints are back-blocked if they don't land on a stud.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'ceilings' && (
        <div className="card">
          <h3>Suspended & Direct-Fix Ceilings</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rondo / Studco system spans and insulation standards.</p>
          <h4 style={{ color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Typical System Spans</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Max Span</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {ceilingData.map((d, i) => (
                <tr key={i}>
                  <td>{d.type}</td>
                  <td>{d.maxSpan}</td>
                  <td>{d.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <h4 style={{ color: 'var(--accent)', fontSize: '0.9rem', margin: '1.5rem 0 0.5rem 0' }}>Minimum Insulation (NCC)</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Region / Type</th>
                <th>Min R-Value</th>
              </tr>
            </thead>
            <tbody>
              {insulationData.map((d, i) => (
                <tr key={i}>
                  <td>{d.zone || d.type}</td>
                  <td>{d.requirement}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#33333333', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={16} color="var(--primary)" /> Pro Tip
            </h4>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>
              Expansion joints are required for ceilings longer than 12m in any direction. Use a back-blocked joint or specific expansion clip for large open areas.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'commercial' && (
        <div className="card">
          <h3>Commercial Installation Guides</h3>
          <div className="column flex gap-4">
            {commercialGuides.map((guide, i) => (
              <div key={i} style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>{guide.title}</h4>
                <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-main)' }}>{guide.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'general' && (
        <div className="card">
          <h3>NCC & Site Standards</h3>
          <div className="column gap-4 flex">
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
              <h4 style={{ margin: 0 }}>Plumb & Level Tolerances</h4>
              <p style={{ fontSize: '0.85rem', margin: '4px 0' }}>Walls must be within 4mm over 3m height.</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
              <h4 style={{ margin: 0 }}>Timber Moisture Content</h4>
              <p style={{ fontSize: '0.85rem', margin: '4px 0' }}>Frame timber should be &lt; 15% before lining.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Handbook;
