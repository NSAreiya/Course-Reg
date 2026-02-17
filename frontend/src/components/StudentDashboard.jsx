import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CourseBrowser from './CourseBrowser';
import ShoppingCart from './ShoppingCart';
import CourseRegistration from './CourseRegistration';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [activeView, setActiveView] = useState('browse');
  const { currentUser, logout } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>🎓 Course Hub</h2>
          <p>Welcome, {currentUser?.username}!</p>
        </div>
        <div className="nav-menu">
          <button
            className={activeView === 'browse' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveView('browse')}
          >
            📚 Browse Courses
          </button>
          <button
            className={activeView === 'register' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveView('register')}
          >
            ✍️ Register Course
          </button>
          <button
            className={activeView === 'cart' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveView('cart')}
          >
            🛒 Cart ({getTotalItems()})
          </button>
          <button className="nav-btn logout-btn" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        {activeView === 'browse' && <CourseBrowser />}
        {activeView === 'register' && <CourseRegistration />}
        {activeView === 'cart' && <ShoppingCart />}
      </div>
    </div>
  );
};

export default StudentDashboard;
