import { useState } from 'react';
import './LandingPage.css';

const LandingPage = ({ onNavigate }) => {
  const courseIcons = [
    { name: 'PHP', color: '#8892BF', icon: '🔧' },
    { name: 'MERN Stack', color: '#61DAFB', icon: '⚛️' },
    { name: 'Java', color: '#5382A1', icon: '☕' },
    { name: 'Spring Boot', color: '#6DB33F', icon: '🍃' },
    { name: 'Python', color: '#3776AB', icon: '🐍' },
    { name: 'JavaScript', color: '#F7DF1E', icon: '💻' },
    { name: 'React', color: '#61DAFB', icon: '⚛️' },
    { name: 'Node.js', color: '#339933', icon: '🟢' },
  ];

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo">
          <h1>🎓 CourseHub</h1>
        </div>
        <div className="header-actions">
          <button className="login-btn-header" onClick={() => onNavigate('login')}>
            Login
          </button>
        </div>
      </header>

      <main className="landing-main">
        <div className="content-section">
          <h1 className="main-heading">
            Transform Your Future
            <br />
            <span className="gradient-text">One Course at a Time</span>
          </h1>
          <p className="subheading">
            Join thousands of students mastering in-demand skills through
            <br />
            expert-led courses. From web development to enterprise solutions,
            <br />
            start your journey to success today.
          </p>

          <div className="stats-section">
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Students Enrolled</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Expert Instructors</p>
            </div>
            <div className="stat-item">
              <h3>95%</h3>
              <p>Success Rate</p>
            </div>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Industry-recognized certifications</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Live projects & hands-on learning</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Flexible learning schedules</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Lifetime course access</span>
            </div>
          </div>

          <div className="cta-buttons">
            <button className="cta-primary" onClick={() => onNavigate('login')}>
              Get Started Now →
            </button>
            <button className="cta-secondary" onClick={() => onNavigate('login')}>
              Explore Courses
            </button>
          </div>
        </div>

        <div className="visual-section">
          <div className="cards-container">
            {courseIcons.map((course, index) => (
              <div
                key={index}
                className="course-badge"
                style={{
                  '--delay': `${index * 0.1}s`,
                  '--rotate': `${(index % 2 === 0 ? 1 : -1) * (Math.random() * 5)}deg`,
                }}
              >
                <span className="badge-icon">{course.icon}</span>
                <span className="badge-name">{course.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
