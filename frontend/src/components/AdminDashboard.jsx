import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ManageCourses from './ManageCourses';
import './AdminDashboard.css';

const AdminDashboard = ({ onNavigate }) => {
  const [activeView, setActiveView] = useState('enrollments');
  const { currentUser, logout } = useAuth();
  const { enrollments, refreshEnrollments } = useCart();

  useEffect(() => {
    // Fetch enrollments when component mounts or when switching to enrollments view
    if (activeView === 'enrollments') {
      console.log('Fetching enrollments...');
      refreshEnrollments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView]);

  useEffect(() => {
    console.log('Current enrollments:', enrollments);
  }, [enrollments]);

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="nav-brand">
          <h2>🔐 Admin Panel</h2>
          <p>Welcome, {currentUser?.username}!</p>
        </div>
        <div className="nav-actions">
          <button 
            className={activeView === 'enrollments' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveView('enrollments')}
          >
            👥 Enrollments
          </button>
          <button 
            className={activeView === 'courses' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveView('courses')}
          >
            📚 Manage Courses
          </button>
          <button className="nav-btn" onClick={() => onNavigate('signup')}>
            ➕ Create Account
          </button>
          <button className="nav-btn logout-btn" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </nav>

      <div className="admin-content">
        {activeView === 'courses' ? (
          <ManageCourses />
        ) : (
          <>
            <div className="enrollment-header">
              <h1>👥 Enrolled Students</h1>
              <p>View all enrolled students (Admin Only)</p>
            </div>

        <div className="enrollment-card">
          <div className="card-title">
            <h2>📋 Enrolled Students List</h2>
            <div className="total-badge">
              Total Enrolled Students: {enrollments.length}
            </div>
          </div>

          {enrollments.length === 0 ? (
            <div className="no-enrollments">
              <div className="empty-icon">📭</div>
              <h3>No Enrollments Yet</h3>
              <p>Students haven't enrolled in any courses yet.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="enrollment-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email ID</th>
                    <th>Course Enrolled</th>
                    <th>Enrollment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id}>
                      <td>
                        <div className="student-name">
                          <span className="avatar">👤</span>
                          {enrollment.studentName}
                        </div>
                      </td>
                      <td>{enrollment.email}</td>
                      <td>
                        <span className="course-badge">{enrollment.courseName}</span>
                      </td>
                      <td className="date-cell">
                        {new Date(enrollment.enrolledAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
