import { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import './App.css';
import PasswordGenerator from './components/PasswordGenerator';
import PasswordStrengthChecker from './components/PasswordStrengthChecker';
import PasswordManager from './components/PasswordManager';

function App() {
  const [activeTab, setActiveTab] = useState('generator');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Password Manager & Suggester</h1>
        <p>Generate, check, and manage your passwords securely</p>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'generator' ? 'active' : ''}`}
          onClick={() => setActiveTab('generator')}
        >
          Generate Password
        </button>
        <button
          className={`tab-btn ${activeTab === 'checker' ? 'active' : ''}`}
          onClick={() => setActiveTab('checker')}
        >
          Check Strength
        </button>
        <button
          className={`tab-btn ${activeTab === 'manager' ? 'active' : ''}`}
          onClick={() => setActiveTab('manager')}
        >
          Password Manager
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'generator' && <PasswordGenerator />}
        {activeTab === 'checker' && <PasswordStrengthChecker />}
        {activeTab === 'manager' && <PasswordManager />}
      </main>

      <footer className="app-footer">
        <p>Passwords are stored locally in your browser. For production use, implement server-side encryption.</p>
      </footer>
    </div>
  );
}

export default App;

