import { useState } from 'react';
import { useCourses } from '../context/CourseContext';
import './ManageCourses.css';

const ManageCourses = () => {
  const { courses, addCourse, deleteCourse } = useCourses();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    description: '',
    duration: '',
    price: '',
    image: '📚',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!formData.name || !formData.instructor || !formData.description || !formData.duration || !formData.price) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    const courseData = {
      ...formData,
      price: parseInt(formData.price),
    };

    console.log('Submitting course data:', courseData);
    const result = await addCourse(courseData);
    console.log('Add course result:', result);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setFormData({
        name: '',
        instructor: '',
        description: '',
        duration: '',
        price: '',
        image: '📚',
      });
      setTimeout(() => {
        setShowAddForm(false);
        setMessage({ type: '', text: '' });
      }, 2000);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  };

  const handleDelete = async (courseId, courseName) => {
    if (window.confirm(`Are you sure you want to delete "${courseName}"?`)) {
      const result = await deleteCourse(courseId);
      if (!result.success) {
        setMessage({ type: 'error', text: result.message });
      }
    }
  };

  const emojiOptions = ['📚', '💻', '🔧', '⚛️', '☕', '🍃', '🐍', '🎨', '🚀', '💡', '🌟', '🎯'];

  return (
    <div className="manage-courses">
      <div className="manage-header">
        <h1>📚 Manage Courses</h1>
        <button className="add-course-btn" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? '✖ Cancel' : '➕ Add New Course'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-course-form-container">
          <h2>Create New Course</h2>
          <form onSubmit={handleSubmit} className="add-course-form">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Course Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Advanced JavaScript"
                />
              </div>

              <div className="form-field">
                <label htmlFor="instructor">Instructor Name *</label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  placeholder="e.g., John Smith"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="description">Course Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description of the course..."
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="duration">Duration *</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 8 weeks"
                />
              </div>

              <div className="form-field">
                <label htmlFor="price">Price (₹) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 4999"
                />
              </div>

              <div className="form-field">
                <label htmlFor="image">Icon</label>
                <select
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                >
                  {emojiOptions.map((emoji) => (
                    <option key={emoji} value={emoji}>
                      {emoji}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {message.text && (
              <div className={message.type === 'error' ? 'msg-error' : 'msg-success'}>
                {message.text}
              </div>
            )}

            <button type="submit" className="submit-course-btn">
              Add Course
            </button>
          </form>
        </div>
      )}

      <div className="courses-list">
        <h2>All Courses ({courses.length})</h2>
        <div className="courses-grid-manage">
          {courses.map((course) => (
            <div key={course.id} className="course-item">
              <div className="course-item-header">
                <span className="course-emoji">{course.image || '📚'}</span>
                <button
                  className="delete-course-btn"
                  onClick={() => handleDelete(course.id, course.name)}
                  title="Delete course"
                >
                  🗑️
                </button>
              </div>
              <h3>{course.name || 'Untitled Course'}</h3>
              <p className="instructor-name">👨‍🏫 {course.instructor || 'Unknown Instructor'}</p>
              <p className="course-desc">{course.description || 'No description available'}</p>
              <div className="course-meta-info">
                <span>⏱️ {course.duration || 'N/A'}</span>
                <span className="price-tag">₹{course.price || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;
