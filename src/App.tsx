import React, { useState } from 'react';
import { Book, Calculator, AlertCircle, Menu, CheckCircle } from 'lucide-react';
import Handbook from './components/Handbook';
import Estimator from './components/Estimator';
import DefectTracker from './components/DefectTracker';
import Compliance from './components/Compliance';

function App() {
  const [activeTab, setActiveTab] = useState<'handbook' | 'estimator' | 'defects' | 'compliance'>('handbook');

  return (
    <div className="app-container">
      <header style={{ 
        padding: '1rem', 
        background: '#000', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid #333',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="flex items-center gap-2">
          <Menu size={20} color="var(--primary)" />
          <h2 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '1px' }}>
            CARPENTER'S <span style={{ color: 'white' }}>COMPANION</span>
          </h2>
        </div>
        <div style={{ background: 'var(--primary)', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
          CDO
        </div>
      </header>

      <main>
        {activeTab === 'handbook' && <Handbook />}
        {activeTab === 'estimator' && <Estimator />}
        {activeTab === 'defects' && <DefectTracker />}
        {activeTab === 'compliance' && <Compliance />}
      </main>

      <nav>
        <button 
          className={`nav-item ${activeTab === 'handbook' ? 'active' : ''}`} 
          onClick={() => setActiveTab('handbook')}
        >
          <Book size={24} />
          <span>Handbook</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'estimator' ? 'active' : ''}`} 
          onClick={() => setActiveTab('estimator')}
        >
          <Calculator size={24} />
          <span>Estimator</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'defects' ? 'active' : ''}`} 
          onClick={() => setActiveTab('defects')}
        >
          <AlertCircle size={24} />
          <span>Defects</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'compliance' ? 'active' : ''}`} 
          onClick={() => setActiveTab('compliance')}
        >
          <CheckCircle size={24} />
          <span>Compliance</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
