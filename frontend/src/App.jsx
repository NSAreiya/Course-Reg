import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { CourseProvider } from './context/CourseContext';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('landing');
  const { currentUser } = useAuth();

  // Navigate between pages
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  // Render based on authentication and current page
  if (!currentUser) {
    if (currentPage === 'signup') {
      return <Signup onNavigate={handleNavigation} />;
    }
    if (currentPage === 'login') {
      return <Login onNavigate={handleNavigation} />;
    }
    return <LandingPage onNavigate={handleNavigation} />;
  }

  // Admin can access signup page to create accounts
  if (currentUser.role === 'admin') {
    if (currentPage === 'signup') {
      return <Signup onNavigate={handleNavigation} />;
    }
    // Default admin page or explicit 'admin' navigation
    return <AdminDashboard onNavigate={handleNavigation} />;
  }

  // Student Dashboard
  return <StudentDashboard />;
}

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;
