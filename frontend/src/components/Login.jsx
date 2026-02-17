import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(username, password);
    if (!result.success) {
      setError(result.message || 'Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🎓 Course Registration</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>
            <button onClick={() => onNavigate('landing')} className="link-btn">
              ← Back to Home
            </button>
          </p>
          <p>
            Admin can create accounts{' '}
            <button onClick={() => onNavigate('signup')} className="link-btn">
              Create Account
            </button>
          </p>
          <p className="demo-info">
            <strong>Demo Credentials:</strong>
            <br />
            Admin: username: admin, password: admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
