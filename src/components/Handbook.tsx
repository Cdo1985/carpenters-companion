import React, { useState } from 'react';
import { Book, Shield, Zap } from 'lucide-react';

const Handbook = () => {
  const [activeTab, setActiveTab] = useState<'timber' | 'steel' | 'plaster' | 'cornice' | 'commercial' | 'redbook' | 'specs' | 'drawings' | 'general'>('timber');

  const plasterData = [
    { type: 'Standard 10/13mm', use: 'General Walls/Ceilings', notes: 'Standard residential lining' },
    { type: 'Aquachek™ (Blue)', use: 'Wet Areas', notes: 'Moisture resistant core & liner' },
    { type: 'Fyrchek™ (Pink)', use: 'Fire Rated Walls', notes: 'Glass fibre reinforced core' },
    { type: 'Impactchek™', use: 'High Traffic', notes: 'Reinforced for impact resistance' },
    { type: 'EC08™ Complete', use: 'Premium/Hospital', notes: 'Highest level impact, fire & moisture' },
    { type: 'Shaft Liner MP', use: 'Elevator Shafts', notes: 'Moisture/mould protected' },
    { type: 'Perforated (Gyptone/Rigitone)', use: 'Acoustic Ceilings', notes: 'Hexagon/Square/Round patterns' },
  ];

  const adhesiveData = [
    { type: 'Acrylic Stud Adhesive', use: 'Timber/Steel Framing', notes: 'Fast tack for plasterboard' },
    { type: 'Masonry Adhesive', use: 'Brick/Block Walls', notes: 'Direct stick application' },
    { type: 'Cornice Cement (45/60/90)', use: 'Cornice Fixing', notes: 'Setting times vary (mins)' },
    { type: 'Back Blocking Cement', use: 'Ceiling Joints', notes: 'Reinforces ceiling butt joints' },
    { type: 'Fire Mastic / CSR FireSeal', use: 'Fire Rated Gaps', notes: 'Maintains FRL rating' },
  ];

  const corniceData = [
    { range: 'Standard', types: 'Cove (55mm, 75mm, 90mm)' },
    { range: 'Contemporary', types: 'Aria™, Duo' },
    { range: 'Inspiration', types: 'Alto™, Trio, Concerto™, Opera™, Tempo™, Symphony™' },
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
          onClick={() => setActiveTab('cornice')} 
          style={{ 
            background: activeTab === 'cornice' ? 'var(--primary)' : '#333',
            color: activeTab === 'cornice' ? '#000' : 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            flexShrink: 0
          }}>
          Cornice & Glue
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
          onClick={() => setActiveTab('redbook')} 
          style={{ 
            background: activeTab === 'redbook' ? 'var(--primary)' : '#333',
            color: activeTab === 'redbook' ? '#000' : 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            flexShrink: 0
          }}>
          Red Book
        </button>
        <button 
          onClick={() => setActiveTab('specs')} 
          style={{ 
            background: activeTab === 'specs' ? 'var(--primary)' : '#333',
            color: activeTab === 'specs' ? '#000' : 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            flexShrink: 0
          }}>
          Spec Templates
        </button>
        <button 
          onClick={() => setActiveTab('drawings')} 
          style={{ 
            background: activeTab === 'drawings' ? 'var(--primary)' : '#333',
            color: activeTab === 'drawings' ? '#000' : 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            flexShrink: 0
          }}>
          Drawing Guide
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

      {activeTab === 'cornice' && (
        <div className="card">
          <h3>Cornices, Adhesives & Sealants</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gyprock products for fixing and finishing.</p>
          
          <h4 style={{ color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Cornice Range</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Range</th>
                <th>Profiles</th>
              </tr>
            </thead>
            <tbody>
              {corniceData.map((d, i) => (
                <tr key={i}>
                  <td>{d.range}</td>
                  <td>{d.types}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 style={{ color: 'var(--accent)', fontSize: '0.9rem', margin: '1.5rem 0 0.5rem 0' }}>Adhesives & Sealants</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Typical Use</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {adhesiveData.map((d, i) => (
                <tr key={i}>
                  <td>{d.type}</td>
                  <td>{d.use}</td>
                  <td style={{ fontSize: '0.75rem' }}>{d.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#33333333', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={16} color="var(--primary)" /> Pro Tip
            </h4>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>
              Use FibaFuse for high-stress joints. Fire mastic is mandatory for all penetrations in Fyrchek installations to maintain the FRL.
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

      {activeTab === 'redbook' && (
        <div className="card">
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <Book size={24} color="var(--primary)" />
            <h3 style={{ margin: 0 }}>Gyprock Red Book Companion</h3>
          </div>
          
          <div className="column gap-4 flex">
            {/* Design Guide Section */}
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Book 1: Design Guide</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Key performance metrics for system selection.</p>
              
              <div style={{ marginTop: '0.5rem' }}>
                <strong style={{ fontSize: '0.85rem', color: 'white' }}>Fire Resistance Level (FRL)</strong>
                <p style={{ fontSize: '0.8rem', margin: '2px 0 8px 0', color: '#aaa' }}>
                  Format: Structural / Integrity / Insulation (e.g., 60/60/60).
                  <br/>
                  <span style={{ color: 'var(--danger)' }}>CRITICAL:</span> All penetrations in FRL walls must use tested fire collars or mastic.
                </p>

                <strong style={{ fontSize: '0.85rem', color: 'white' }}>Acoustic Ratings (Rw)</strong>
                <p style={{ fontSize: '0.8rem', margin: '2px 0 0 0', color: '#aaa' }}>
                  Rw + Ctr is the value for low-frequency noise (traffic/music).
                  <br/>
                  SOUNDCHEK™ (Yellow) adds mass to improve Rw.
                </p>
              </div>
            </div>

            {/* Residential Guide Section */}
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Book 2: Residential Guide</h4>
              <table className="table" style={{ marginTop: 0 }}>
                <thead>
                  <tr>
                    <th>Application</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>General Wall</td>
                    <td>10mm plasterboard @ 600mm centers (max).</td>
                  </tr>
                  <tr>
                    <td>Wet Areas</td>
                    <td>Must comply with AS 3740. Flashing required at wall/floor junctions.</td>
                  </tr>
                  <tr>
                    <td>Ceilings</td>
                    <td>10mm Supaceil™ spans 600mm. Standard 10mm spans 450mm.</td>
                  </tr>
                  <tr>
                    <td>Party Walls</td>
                    <td>Discontinuous construction req. for acoustic separation.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Commercial Guide Section */}
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Book 3: Commercial Guide</h4>
              <div className="column gap-2 flex">
                <div style={{ fontSize: '0.85rem' }}>
                  <span className="badge badge-studco">Steel Studs</span>
                  <span style={{ marginLeft: '8px' }}>Check tables for deflection limits (L/240 vs L/360).</span>
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  <span className="badge badge-rondo">Fire Rated</span>
                  <span style={{ marginLeft: '8px' }}>Fyrchek™ often requires specific screw patterns (e.g., laminating screws for multi-layer).</span>
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  <span className="badge" style={{ background: '#555', color: 'white' }}>Shaft Liner</span>
                  <span style={{ marginLeft: '8px' }}>CH-Stud systems allow installation from one side.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'specs' && (
        <div className="card">
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <Zap size={24} color="var(--primary)" />
            <h3 style={{ margin: 0 }}>System Specification Templates</h3>
          </div>
          
          <div className="column gap-4 flex">
            {/* Wall & Ceiling Specs Section */}
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Standard System Specs</h4>
              <div className="column gap-2 flex" style={{ fontSize: '0.85rem' }}>
                <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #333', paddingBottom: '4px' }}>
                  <span>Wall (Non-Rated)</span>
                  <span style={{ color: 'var(--text-muted)' }}>10mm Std | 600mm Studs</span>
                </div>
                <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #333', paddingBottom: '4px' }}>
                  <span>Wall (Fire Rated)</span>
                  <span style={{ color: 'var(--danger)' }}>13/16mm Fyrchek™ | FRL 60/60/60</span>
                </div>
                <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #333', paddingBottom: '4px' }}>
                  <span>Ceiling (Std)</span>
                  <span style={{ color: 'var(--text-muted)' }}>10mm Supaceil™ | 600mm Spacing</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Wet Area Wall</span>
                  <span style={{ color: 'var(--accent)' }}>10/13mm Aquachek™ | AS 3740</span>
                </div>
              </div>
            </div>

            {/* AS/NZS 2589 Finish Levels */}
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>AS/NZS 2589 Finish Levels</h4>
              <div className="column gap-3 flex">
                <div>
                  <strong style={{ fontSize: '0.85rem', color: 'white' }}>Level 3 (Service Areas)</strong>
                  <p style={{ fontSize: '0.8rem', margin: '2px 0 0 0', color: 'var(--text-muted)' }}>2-coat system. Used in shafts or above ceilings where appearance is non-critical.</p>
                </div>
                <div>
                  <strong style={{ fontSize: '0.85rem', color: 'white' }}>Level 4 (Standard Residential)</strong>
                  <p style={{ fontSize: '0.8rem', margin: '2px 0 0 0', color: 'var(--text-muted)' }}>3-coat system. Default for domestic work. Sanded smooth, ready for low-sheen paint.</p>
                </div>
                <div>
                  <strong style={{ fontSize: '0.85rem', color: 'white' }}>Level 5 (Premium / Critical Lighting)</strong>
                  <p style={{ fontSize: '0.8rem', margin: '2px 0 0 0', color: 'var(--text-muted)' }}>L4 + full surface skim coat. Required for gloss paint or walls with heavy glancing light.</p>
                </div>
              </div>
            </div>

            {/* Compliance Quick Rules */}
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.05)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Compliance Quick Rules</h4>
              <ul style={{ fontSize: '0.8rem', color: 'var(--text-main)', paddingLeft: '1.2rem', margin: 0 }}>
                <li><strong>Board Fixing:</strong> Stagger all joints. No "butt joints" in centers of large ceilings.</li>
                <li><strong>Fasteners:</strong> Minimum 6mm from edge. Heads slightly below surface but not breaking paper.</li>
                <li><strong>Jointing:</strong> Taping coat must be allowed to dry before applying base/topping coats.</li>
                <li><strong>Site Storage:</strong> Boards must be stacked flat, off the ground, and protected from weather.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'drawings' && (
        <div className="card">
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <MapPin size={24} color="var(--primary)" />
            <h3 style={{ margin: 0 }}>Project Drawing Guide</h3>
          </div>
          
          <div className="column gap-4 flex">
            {/* Title Block & Revisions Section */}
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Title Block & Revisions</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>The source of truth for drawing currency.</p>
              <div className="column gap-2 flex" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '4px' }}>
                  <strong>Revision Clouds:</strong> Look for cloud-shaped outlines. These indicate changes since the last issue. Check the revision letter/number (e.g., Rev B) in the title block.
                </div>
                <div style={{ borderBottom: '1px solid #333', paddingBottom: '4px' }}>
                  <strong>Current Issue:</strong> Always check that you are working from the latest revision date.
                </div>
              </div>
            </div>

            {/* Common Symbols Section */}
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Standard Symbols (AS 1100)</h4>
              <div className="column gap-2 flex" style={{ fontSize: '0.85rem' }}>
                <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #333', paddingBottom: '4px' }}>
                  <span>Section Marker</span>
                  <span style={{ color: 'var(--text-muted)' }}>Circle with cut line & arrow</span>
                </div>
                <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #333', paddingBottom: '4px' }}>
                  <span>Elevation Marker</span>
                  <span style={{ color: 'var(--text-muted)' }}>Circle with view triangle</span>
                </div>
                <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #333', paddingBottom: '4px' }}>
                  <span>North Arrow</span>
                  <span style={{ color: 'var(--primary)' }}>Orientation to True North</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>RL / FFL</span>
                  <span style={{ color: 'var(--success)' }}>Relative / Finished Floor Level</span>
                </div>
              </div>
            </div>

            {/* Common Abbreviations Section */}
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Common Abbreviations</h4>
              <div className="flex flex-wrap gap-2">
                {['AFFL (Above FFL)', 'CLR (Clearance)', 'DP (Downpipe)', 'EF (Exhaust Fan)', 'GPO (Power Outlet)', 'NTS (Not to Scale)', 'U/S (Underside)', 'UNO (Unless Noted Otherwise)'].map((abbr, i) => (
                  <span key={i} style={{ background: '#333', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>{abbr}</span>
                ))}
              </div>
            </div>

            {/* Scale & Scale Bars Section */}
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.05)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Scale & Measurement</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', margin: 0 }}>
                <strong>Always use the written dimension (UNO).</strong> If dimensions are missing, refer to the scale (e.g., 1:100). 
                <br/><br/>
                <span style={{ color: 'var(--danger)' }}>WARNING:</span> Printing a PDF at "Fit to Page" will destroy the scale. Always use the scale bar for verification.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'general' && (
        <div className="card">
          <h3>NCC & Site Standards (Melbourne/VIC)</h3>
          <div className="column gap-4 flex">
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
              <h4 style={{ margin: 0 }}>VBA Guide to Standards 2015</h4>
              <p style={{ fontSize: '0.85rem', margin: '4px 0', color: 'var(--text-muted)' }}>The primary reference for acceptable workmanship in Victoria. Covers plumb, level, and finish tolerances.</p>
              <div style={{ fontSize: '0.8rem', marginTop: '4px', fontWeight: 'bold', color: 'var(--accent)' }}>Plumb: ±4mm over 2.4m | Floor: ±5mm over 3m</div>
            </div>
            
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <h4 style={{ margin: 0 }}>Melbourne Climate (Zone 6)</h4>
              <p style={{ fontSize: '0.85rem', margin: '4px 0', color: 'var(--text-muted)' }}>Standard insulation for Melbourne usually requires R2.5 - R2.7 in walls and R5.0+ in ceilings to meet 7-star energy ratings.</p>
            </div>

            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Top Melbourne Suppliers</h4>
              <div className="flex column gap-2">
                <div className="flex justify-between items-center" style={{ fontSize: '0.85rem' }}>
                  <span>Bowens</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Locations across VIC</span>
                </div>
                <div className="flex justify-between items-center" style={{ fontSize: '0.85rem' }}>
                  <span>Dahlsens</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Trade specialist</span>
                </div>
                <div className="flex justify-between items-center" style={{ fontSize: '0.85rem' }}>
                  <span>Bunnings Trade</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>7-day delivery report rule</span>
                </div>
                <div className="flex justify-between items-center" style={{ fontSize: '0.85rem' }}>
                  <span>Plasterer's One Stop Shop</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Specialist tools</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)' }}>
              <h4 style={{ margin: 0, color: 'var(--danger)' }}>BAL Ratings</h4>
              <p style={{ fontSize: '0.85rem', margin: '4px 0' }}>Always verify if the site is in a Bushfire Prone Area. BAL-12.5 to BAL-40 require specific mesh and timber species (e.g., Spotted Gum/Ironbark).</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Handbook;
