import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCourses } from '../context/CourseContext';
import './CourseRegistration.css';

const CourseRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const { currentUser } = useAuth();
  const { enrollCourse } = useCart();
  const { courses } = useCourses();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!name || !email || !selectedCourse) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    const result = await enrollCourse(name, email, selectedCourse, currentUser.username);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setName('');
      setEmail('');
      setSelectedCourse('');
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  };

  return (
    <div className="course-registration">
      <div className="registration-header">
        <h1>✍️ Register for a Course</h1>
        <p>Enroll yourself in exciting new courses</p>
      </div>

      <div className="registration-card">
        <div className="card-header">
          <h2>📝 Register Course to Explore More Excitement</h2>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-field">
            <label htmlFor="name">Enter your Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Enter your Email ID:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-field">
            <label htmlFor="course">Choose a Course:</label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name} - ₹{course.price} ({course.duration})
                </option>
              ))}
            </select>
          </div>

          {message.text && (
            <div className={message.type === 'error' ? 'msg-error' : 'msg-success'}>
              {message.text}
            </div>
          )}

          <button type="submit" className="submit-btn">
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseRegistration;
