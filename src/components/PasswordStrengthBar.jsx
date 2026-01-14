import zxcvbn from 'zxcvbn';
import '../styles/PasswordStrengthBar.css';

function PasswordStrengthBar({ password }) {
  const result = zxcvbn(password);
  const score = result.score; // 0-4

  const getLabel = (score) => {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return labels[score];
  };

  const getColor = (score) => {
    const colors = ['#e74c3c', '#e67e22', '#f39c12', '#27ae60', '#2ecc71'];
    return colors[score];
  };

  return (
    <div className="strength-bar-container">
      <div className="strength-bars">
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`strength-segment ${level <= score ? 'active' : ''}`}
            style={{
              backgroundColor: level <= score ? getColor(score) : '#e0e0e0',
            }}
          />
        ))}
      </div>
      <span className="strength-label" style={{ color: getColor(score) }}>
        {getLabel(score)}
      </span>
    </div>
  );
}

export default PasswordStrengthBar;
