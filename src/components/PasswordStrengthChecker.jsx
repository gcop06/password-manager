import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import PasswordStrengthBar from './PasswordStrengthBar';
import '../styles/PasswordStrengthChecker.css';

function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    if (pwd) {
      const result = zxcvbn(pwd);
      setFeedback(result);
    } else {
      setFeedback(null);
    }
  };

  const getScoreLabel = (score) => {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return labels[score] || 'Unknown';
  };

  const getScoreColor = (score) => {
    const colors = ['#e74c3c', '#e67e22', '#f39c12', '#27ae60', '#2ecc71'];
    return colors[score] || '#95a5a6';
  };

  return (
    <div className="strength-checker">
      <div className="checker-card">
        <h2>Password Strength Checker</h2>

        <div className="password-input-group">
          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password to check strength"
              className="strength-input"
            />
            <button
              className="toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {feedback && (
          <div className="feedback-section">
            <div className="strength-result">
              <span className="score-label">Strength:</span>
              <span
                className="score-value"
                style={{ color: getScoreColor(feedback.score) }}
              >
                {getScoreLabel(feedback.score)}
              </span>
            </div>

            <PasswordStrengthBar password={password} />

            <div className="metrics">
              <div className="metric">
                <span className="metric-label">Crack Time (online):</span>
                <span className="metric-value">
                  {feedback.crack_times_display.online_throttling_100_per_10_seconds}
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Crack Time (offline):</span>
                <span className="metric-value">
                  {feedback.crack_times_display.offline_slow_hashing_1e4_per_second}
                </span>
              </div>
            </div>

            {feedback.feedback && (
              <div className="suggestions">
                <h3>💡 Suggestions:</h3>
                {feedback.feedback.warning && (
                  <p className="warning">{feedback.feedback.warning}</p>
                )}
                {feedback.feedback.suggestions && feedback.feedback.suggestions.length > 0 && (
                  <ul>
                    {feedback.feedback.suggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="score-details">
              <h3>📊 Details:</h3>
              <p>Calculation Time: {feedback.calc_time}ms</p>
              <p>Guesses: {feedback.guesses?.toLocaleString() || 'N/A'}</p>
            </div>
          </div>
        )}

        {!password && (
          <div className="placeholder-message">
            <p>👆 Enter a password to analyze its strength</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordStrengthChecker;
