import { useState } from 'react';
import { generatePassword } from '../utils/passwordUtils';
import PasswordStrengthBar from './PasswordStrengthBar';
import '../styles/PasswordGenerator.css';

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(
      length,
      useUppercase,
      useLowercase,
      useNumbers,
      useSymbols
    );
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="password-generator">
      <div className="generator-card">
        <h2>Password Generator</h2>
        
        <div className="password-display">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Generated password will appear here"
            className="password-output"
          />
          <button
            className="copy-btn"
            onClick={handleCopyToClipboard}
            title="Copy to clipboard"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {password && <PasswordStrengthBar password={password} />}

        <div className="options-section">
          <div className="length-control">
            <label htmlFor="length">Password Length: {length}</label>
            <input
              id="length"
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
            <span className="length-hint">8 - 32 characters</span>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useUppercase}
                onChange={(e) => setUseUppercase(e.target.checked)}
              />
              Uppercase (A-Z)
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useLowercase}
                onChange={(e) => setUseLowercase(e.target.checked)}
              />
              Lowercase (a-z)
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
              />
              Numbers (0-9)
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
              />
              Symbols (!@#$%...)
            </label>
          </div>
        </div>

        <button className="generate-btn" onClick={handleGeneratePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default PasswordGenerator;
