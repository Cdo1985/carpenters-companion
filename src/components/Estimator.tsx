import React, { useState } from 'react';
import { Calculator, DollarSign, Hammer, Layers, Clipboard, Box, Wind, Printer, Mail } from 'lucide-react';

const Estimator = () => {
  const [mode, setMode] = useState<'wall' | 'ceiling'>('wall');
  const [length, setLength] = useState<number>(0);
  const [widthOrHeight, setWidthOrHeight] = useState<number>(2.4);
  const [spacing, setSpacing] = useState<number>(0.6);
  const [material, setMaterial] = useState<'timber' | 'steel'>('timber');
  const [rate, setRate] = useState<number>(75); 

  // Ceiling Specific
  const [ceilingSystem, setCeilingSystem] = useState<'furring' | 'studs'>('furring');
  const [includeMainBar, setIncludeMainBar] = useState<boolean>(true);
  const [insulationType, setInsulationType] = useState<string>('None');

  // Plastering & Sheeting
  const [includePlastering, setIncludePlastering] = useState<boolean>(false);
  const [boardType, setBoardType] = useState<string>('Standard 10mm');
  const [boardLength, setBoardLength] = useState<number>(2.4);
  const [includeTroweling, setIncludeTroweling] = useState<boolean>(false);

  // Extras
  const [accessPanels, setAccessPanels] = useState<number>(0);
  const [extraCosts, setExtraCosts] = useState<number>(0);

  // Calculations
  const area = length * widthOrHeight;
  
  let framingLaborHours = 0;
  let totalLM = 0; // Primary framing
  let mainBarLM = 0;
  let hangersCount = 0;

  if (mode === 'wall') {
    const studs = Math.ceil(length / spacing) + 1;
    const tracks = length * 2;
    const noggins = Math.ceil(widthOrHeight / 1.35) * length;
    totalLM = studs * widthOrHeight + tracks + (material === 'timber' ? noggins : 0);
    // Labor estimation: 1 hr per 4 LM of timber, 1 hr per 6 LM of steel (walls)
    framingLaborHours = totalLM / (material === 'timber' ? 4 : 6);
  } else {
    // Ceiling logic
    const primaryRuns = Math.ceil(widthOrHeight / spacing) + 1;
    totalLM = primaryRuns * length;
    
    if (includeMainBar) {
      const mainBarRuns = Math.ceil(length / 1.2) + 1; // standard 1200mm centers
      mainBarLM = mainBarRuns * widthOrHeight;
      hangersCount = Math.ceil(mainBarLM / 1.2); // hangers every 1.2m
    } else {
      hangersCount = Math.ceil(totalLM / 1.2);
    }
    
    // Ceiling labor: ~0.4 hrs per m2 for basic grid, ~0.6 with main bar
    framingLaborHours = area * (includeMainBar ? 0.6 : 0.4);
  }

  // Plastering & Sheeting Calculations
  const boardArea = boardLength * 1.2;
  const boardsNeeded = includePlastering ? Math.ceil(area / boardArea) : 0;
  
  // Sheeting labor: ~0.15 hrs per m2 for walls, ~0.25 for ceilings
  const sheetingLaborHours = includePlastering ? area * (mode === 'wall' ? 0.15 : 0.25) : 0;
  
  // Troweling labor: ~0.25 hrs per m2 (3 coats)
  const trowelingLaborHours = includeTroweling ? area * (mode === 'wall' ? 0.25 : 0.35) : 0;

  // Insulation
  const insulationLabor = insulationType !== 'None' ? area * 0.1 : 0;

  // Extras Labor
  const extrasLabor = (accessPanels * 1.5); // 1.5 hrs per access panel

  const totalLaborHours = framingLaborHours + sheetingLaborHours + trowelingLaborHours + insulationLabor + extrasLabor;
  const totalLaborCost = (totalLaborHours * rate) + extraCosts;

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const subject = `Quote for ${mode === 'wall' ? 'Wall' : 'Ceiling'} Works`;
    const body = `
Quote Details:
--------------------------------
Type: ${mode === 'wall' ? 'Wall' : 'Ceiling'}
Dimensions: ${length}m x ${widthOrHeight}m
Area: ${area.toFixed(2)} m2
Material: ${material}
Spacing: ${spacing * 1000}mm

Framing: ${totalLM.toFixed(1)} LM
${mode === 'ceiling' && includeMainBar ? `Main Bar: ${mainBarLM.toFixed(1)} LM (${hangersCount} hangers)\n` : ''}
Insulation: ${insulationType}
Plastering: ${includePlastering ? 'Yes' : 'No'} ${includePlastering ? `(${boardType})` : ''}
Troweling: ${includeTroweling ? 'Yes' : 'No'}

Labor Rate: $${rate}/hr
Total Hours: ${totalLaborHours.toFixed(1)} hrs
--------------------------------
Estimated Cost: $${totalLaborCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
    `.trim();
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="estimator">
      <div className="card" style={{ padding: '0.5rem', marginBottom: '1rem' }}>
        <div className="flex gap-2">
          <button 
            onClick={() => setMode('wall')}
            style={{ 
              flex: 1, 
              background: mode === 'wall' ? 'var(--primary)' : 'transparent',
              color: mode === 'wall' ? '#000' : 'white',
              padding: '10px'
            }}>
            Wall Estimator
          </button>
          <button 
            onClick={() => setMode('ceiling')}
            style={{ 
              flex: 1, 
              background: mode === 'ceiling' ? 'var(--primary)' : 'transparent',
              color: mode === 'ceiling' ? '#000' : 'white',
              padding: '10px'
            }}>
            Ceiling Estimator
          </button>
        </div>
      </div>

      <div className="card">
        <h3>{mode === 'wall' ? 'Wall' : 'Ceiling'} Specifications</h3>
        <div className="column gap-4 flex">
          <div className="flex gap-4">
            <div className="form-group" style={{ flex: 1 }}>
              <label>Length (m)</label>
              <input 
                type="number" 
                value={length || ''} 
                onChange={(e) => setLength(Number(e.target.value))} 
                placeholder="0.00"
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>{mode === 'wall' ? 'Height (m)' : 'Width (m)'}</label>
              <input 
                type="number" 
                value={widthOrHeight} 
                onChange={(e) => setWidthOrHeight(Number(e.target.value))} 
              />
            </div>
          </div>

          {mode === 'wall' ? (
            <div className="form-group">
              <label>Framing Material</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setMaterial('timber')} 
                  style={{ 
                    flex: 1, 
                    background: material === 'timber' ? '#444' : '#222', 
                    border: material === 'timber' ? '1px solid var(--primary)' : '1px solid #333',
                    padding: '8px'
                  }}>
                  Timber
                </button>
                <button 
                  onClick={() => setMaterial('steel')} 
                  style={{ 
                    flex: 1, 
                    background: material === 'steel' ? '#444' : '#222', 
                    border: material === 'steel' ? '1px solid var(--primary)' : '1px solid #333',
                    padding: '8px'
                  }}>
                  Steel
                </button>
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label>Ceiling System</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCeilingSystem('furring')} 
                  style={{ 
                    flex: 1, 
                    background: ceilingSystem === 'furring' ? '#444' : '#222', 
                    border: ceilingSystem === 'furring' ? '1px solid var(--primary)' : '1px solid #333', 
                    padding: '8px' 
                  }}>
                  Furring Channel
                </button>
                <button 
                  onClick={() => setCeilingSystem('studs')} 
                  style={{ 
                    flex: 1, 
                    background: ceilingSystem === 'studs' ? '#444' : '#222', 
                    border: ceilingSystem === 'studs' ? '1px solid var(--primary)' : '1px solid #333', 
                    padding: '8px' 
                  }}>
                  C-Stud Ceiling
                </button>
              </div>
            </div>
          )}

          <div className="form-group">
            <label>{mode === 'wall' ? 'Stud Spacing' : 'Channel/Stud Spacing'}</label>
            <select value={spacing} onChange={(e) => setSpacing(Number(e.target.value))}>
              <option value={0.6}>600mm</option>
              <option value={0.45}>450mm</option>
              <option value={0.3}>300mm</option>
            </select>
          </div>

          {mode === 'ceiling' && (
            <div className="form-group">
              <div className="flex items-center justify-between">
                <label style={{ margin: 0 }}>Include Main Bar (Key-Lock)</label>
                <input 
                  type="checkbox" 
                  checked={includeMainBar} 
                  onChange={(e) => setIncludeMainBar(e.target.checked)}
                  style={{ width: 'auto' }}
                />
              </div>
            </div>
          )}

          <hr style={{ border: '0', borderTop: '1px solid #333', margin: '0.5rem 0' }} />

          <div className="form-group">
            <label>Insulation</label>
            <select value={insulationType} onChange={(e) => setInsulationType(e.target.value)}>
              <option>None</option>
              <option>R2.0 Thermal Batts</option>
              <option>R2.5 Thermal Batts</option>
              <option>R4.0 Ceiling Batts</option>
              <option>Sound Screen (Acoustic)</option>
            </select>
          </div>

          <div className="form-group">
            <div className="flex items-center justify-between">
              <label style={{ margin: 0 }}>Include Sheeting & Troweling</label>
              <input 
                type="checkbox" 
                checked={includePlastering} 
                onChange={(e) => setIncludePlastering(e.target.checked)}
                style={{ width: 'auto' }}
              />
            </div>
          </div>

          {includePlastering && (
            <div className="column gap-3 flex" style={{ background: '#252525', padding: '1rem', borderRadius: '8px' }}>
              <div className="form-group">
                <label>Board Type</label>
                <select value={boardType} onChange={(e) => setBoardType(e.target.value)}>
                  <option>Standard 10mm</option>
                  <option>Ceiling Board 10mm (Span 600)</option>
                  <option>Wet Area 10mm</option>
                  <option>Fire Rated 13mm</option>
                </select>
              </div>
              <div className="form-group">
                <div className="flex items-center justify-between">
                  <label style={{ margin: 0 }}>Include Troweling</label>
                  <input 
                    type="checkbox" 
                    checked={includeTroweling} 
                    onChange={(e) => setIncludeTroweling(e.target.checked)}
                    style={{ width: 'auto' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Extras & Access Panels</label>
            <div className="flex gap-2">
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Access Panels (Qty)</span>
                <input type="number" value={accessPanels} onChange={(e) => setAccessPanels(Number(e.target.value))} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Other Costs ($)</span>
                <input type="number" value={extraCosts} onChange={(e) => setExtraCosts(Number(e.target.value))} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Hourly Labor Rate ($)</label>
            <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
        </div>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
        <h3 style={{ color: 'var(--success)' }}>Quote Results</h3>
        <div className="column gap-2 flex">
          <div className="result-box flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Layers size={18} color="var(--primary)" />
              <span>{mode === 'wall' ? 'Framing' : (ceilingSystem === 'furring' ? 'Furring Channel' : 'Ceiling Studs')}</span>
            </div>
            <span style={{ fontWeight: 'bold' }}>{totalLM.toFixed(1)} LM</span>
          </div>

          {mode === 'ceiling' && includeMainBar && (
            <div className="result-box flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Box size={18} color="var(--primary)" />
                <span>Main Bar & Hangers</span>
              </div>
              <span style={{ fontWeight: 'bold' }}>{mainBarLM.toFixed(1)} LM ({hangersCount} pcs)</span>
            </div>
          )}

          {insulationType !== 'None' && (
            <div className="result-box flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Wind size={18} color="var(--accent)" />
                <span>Insulation</span>
              </div>
              <span style={{ fontWeight: 'bold' }}>{area.toFixed(1)} m²</span>
            </div>
          )}

          <div className="result-box flex justify-between items-center">
            <div className="flex items-center gap-2">
              <DollarSign size={18} color="var(--success)" />
              <span>Total Quote (Labor + Extras)</span>
            </div>
            <span style={{ fontWeight: 'bold', color: 'var(--success)', fontSize: '1.2rem' }}>
              ${totalLaborCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', background: '#111', padding: '0.5rem', borderRadius: '4px' }}>
            <p style={{ margin: '2px 0' }}>• Total Hours: {totalLaborHours.toFixed(1)} hrs</p>
            <p style={{ margin: '2px 0' }}>• Area: {area.toFixed(1)} m²</p>
            {includePlastering && <p style={{ margin: '2px 0' }}>• Boards: {boardsNeeded} ({boardType})</p>}
          </div>

          <div className="flex gap-2" style={{ marginTop: '1rem' }}>
            <button 
              onClick={handlePrint}
              style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px', 
                background: '#333', 
                color: 'white', 
                padding: '10px', 
                borderRadius: '6px' 
              }}>
              <Printer size={18} />
              Print
            </button>
            <button 
              onClick={handleEmail}
              style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px', 
                background: 'var(--primary)', 
                color: 'black', 
                fontWeight: 'bold',
                padding: '10px', 
                borderRadius: '6px' 
              }}>
              <Mail size={18} />
              Email Quote
            </button>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem' }}>
            *Estimates exclude GST and fixings. Based on standard residential/commercial productivity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Estimator;
