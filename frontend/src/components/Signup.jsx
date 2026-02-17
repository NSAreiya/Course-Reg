import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Signup = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState({ type: '', text: '' });
  const { signup, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!username || !password) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    const result = await signup(username, password, role);
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setUsername('');
      setPassword('');
      setRole('student');
      
      // Redirect back to admin dashboard after 1.5 seconds if admin is logged in
      setTimeout(() => {
        if (currentUser?.role === 'admin') {
          onNavigate('admin');
        } else {
          onNavigate('login');
        }
      }, 1500);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  };

  // Only admin can access signup page
  if (currentUser?.role !== 'admin') {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>⛔ Access Denied</h1>
            <p>Only administrators can create accounts</p>
          </div>
          <button onClick={() => onNavigate('login')} className="login-btn">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>➕ Create Account</h1>
          <p>Admin: Create new user accounts</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (min 6 characters)"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {message.text && (
            <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
              {message.text}
            </div>
          )}

          <button type="submit" className="login-btn">
            Create Account
          </button>
        </form>

        <div className="login-footer">
          <p>
            <button onClick={() => onNavigate(currentUser?.role === 'admin' ? 'admin' : 'login')} className="link-btn">
              ← Back to {currentUser?.role === 'admin' ? 'Dashboard' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
