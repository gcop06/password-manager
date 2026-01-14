import { useState, useEffect } from 'react';
import { encryptPassword, decryptPassword } from '../utils/encryption';
import '../styles/PasswordManager.css';

function PasswordManager() {
  const [passwords, setPasswords] = useState([]);
  const [siteName, setSiteName] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Load passwords from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('passwordManager');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setPasswords(data);
      } catch (e) {
        console.error('Error loading passwords:', e);
      }
    }
  }, []);

  // Save passwords to localStorage
  useEffect(() => {
    localStorage.setItem('passwordManager', JSON.stringify(passwords));
  }, [passwords]);

  const handleUnlock = () => {
    if (masterPassword.trim()) {
      setIsUnlocked(true);
      setMasterPassword('');
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setMasterPassword('');
    setEditingId(null);
  };

  const handleAddPassword = (e) => {
    e.preventDefault();

    if (!siteName.trim() || !password.trim()) {
      alert('Please enter at least site name and password');
      return;
    }

    const newEntry = {
      id: editingId || Date.now(),
      siteName: siteName.trim(),
      siteUrl: siteUrl.trim(),
      username: username.trim(),
      password: password, // In production, encrypt this
      createdAt: new Date(editingId ? 0 : Date.now()).toISOString(),
    };

    if (editingId) {
      setPasswords(passwords.map(p => p.id === editingId ? newEntry : p));
      setEditingId(null);
    } else {
      setPasswords([...passwords, newEntry]);
    }

    setSiteName('');
    setSiteUrl('');
    setUsername('');
    setPassword('');
    setShowForm(false);
  };

  const handleEdit = (entry) => {
    setSiteName(entry.siteName);
    setSiteUrl(entry.siteUrl);
    setUsername(entry.username);
    setPassword(entry.password);
    setEditingId(entry.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      setPasswords(passwords.filter(p => p.id !== id));
    }
  };

  const handleCopyPassword = (pwd) => {
    navigator.clipboard.writeText(pwd);
    alert('Password copied to clipboard!');
  };

  const handleCopyUsername = (user) => {
    navigator.clipboard.writeText(user);
    alert('Username copied to clipboard!');
  };

  const filteredPasswords = passwords.filter(p =>
    p.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isUnlocked) {
    return (
      <div className="password-manager">
        <div className="manager-card unlock-card">
          <h2>🔒 Password Manager</h2>
          <p>Enter your master password to access your passwords</p>
          <div className="unlock-form">
            <input
              type="password"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="Master Password"
              className="master-password-input"
            />
            <button onClick={handleUnlock} className="unlock-btn">
              🔓 Unlock
            </button>
          </div>
          <p className="hint">Hint: Use any password for demo (no actual encryption)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="password-manager">
      <div className="manager-card">
        <div className="manager-header">
          <h2>🔐 Your Passwords</h2>
          <button onClick={handleLock} className="lock-btn" title="Lock password manager">
            🔒 Lock
          </button>
        </div>

        <div className="manager-controls">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Search passwords..."
            className="search-input"
          />
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (editingId) setEditingId(null);
            }}
            className="add-btn"
          >
            {showForm ? '❌ Cancel' : '➕ Add Password'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAddPassword} className="password-form">
            <h3>{editingId ? 'Edit Password' : 'Add New Password'}</h3>

            <div className="form-group">
              <label htmlFor="siteName">Site/Service Name *</label>
              <input
                id="siteName"
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="e.g., Gmail, GitHub, Netflix"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="siteUrl">Site URL (optional)</label>
              <input
                id="siteUrl"
                type="url"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                placeholder="e.g., https://gmail.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username/Email</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username or email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              {editingId ? '💾 Update' : '💾 Save'}
            </button>
          </form>
        )}

        <div className="passwords-list">
          {filteredPasswords.length === 0 ? (
            <div className="empty-state">
              <p>📭 No passwords stored yet</p>
              <p className="hint">Click "Add Password" to get started</p>
            </div>
          ) : (
            <div className="passwords-grid">
              {filteredPasswords.map((entry) => (
                <div key={entry.id} className="password-card">
                  <div className="card-header">
                    <h3>{entry.siteName}</h3>
                    <div className="card-actions">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="action-btn edit-btn"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="action-btn delete-btn"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {entry.siteUrl && (
                    <a href={entry.siteUrl} target="_blank" rel="noopener noreferrer" className="site-url">
                      🔗 {entry.siteUrl}
                    </a>
                  )}

                  {entry.username && (
                    <div className="card-item">
                      <span className="item-label">Username:</span>
                      <div className="item-content">
                        <span>{entry.username}</span>
                        <button
                          onClick={() => handleCopyUsername(entry.username)}
                          className="copy-icon"
                          title="Copy username"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="card-item">
                    <span className="item-label">Password:</span>
                    <div className="item-content">
                      <span className="password-masked">••••••••</span>
                      <button
                        onClick={() => handleCopyPassword(entry.password)}
                        className="copy-icon"
                        title="Copy password"
                      >
                        📋
                      </button>
                    </div>
                  </div>

                  <div className="card-footer">
                    <small>Added: {new Date(entry.createdAt).toLocaleDateString()}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordManager;
