import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for logged in user
    const loggedUser = localStorage.getItem('currentUser');
    const authToken = localStorage.getItem('authToken');
    
    if (loggedUser && authToken) {
      setCurrentUser(JSON.parse(loggedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password);
      
      // Store token and user info
      localStorage.setItem('authToken', response.token);
      const userInfo = {
        username: response.username,
        role: response.role.toLowerCase(), // Convert ADMIN/STUDENT to admin/student
      };
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      setCurrentUser(userInfo);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Invalid credentials' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  const signup = async (username, password, role) => {
    try {
      await authAPI.signup(username, password, role.toUpperCase()); // Backend expects ADMIN/STUDENT
      return { success: true, message: 'Account created successfully' };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: error.message || 'Failed to create account' };
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
