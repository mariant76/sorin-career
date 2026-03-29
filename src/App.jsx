import { Routes, Route, NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText } from 'lucide-react'
import Tracker from './pages/Tracker'
import CVBuilder from './pages/CVBuilder'

function App() {
  return (
    <div className="layout-container">
      <nav className="sidebar">
        <div className="brand">
          <div style={{
            width: '32px', height: '32px', 
            borderRadius: '8px', 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white'
          }}>S</div>
          Sorin Career
        </div>
        
        <div className="nav-links">
          <NavLink 
            to="/" 
            className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}
            end
          >
            <LayoutDashboard size={20} />
            Tracker
          </NavLink>
          <NavLink 
            to="/cv" 
            className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <FileText size={20} />
            CV Builder
          </NavLink>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Tracker />} />
          <Route path="/cv" element={<CVBuilder />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
