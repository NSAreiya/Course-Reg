import { useCart } from '../context/CartContext';
import { useCourses } from '../context/CourseContext';
import './CourseBrowser.css';

const CourseBrowser = () => {
  const { addToCart, cartItems } = useCart();
  const { courses } = useCourses();

  const isInCart = (courseId) => {
    return cartItems.some((item) => item.id === courseId);
  };

  const handleAddToCart = (course) => {
    addToCart(course);
  };

  return (
    <div className="course-browser">
      <div className="browser-header">
        <h1>🛍️ Browse Courses</h1>
        <p>Explore our collection of premium courses</p>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-icon">{course.image || '📚'}</div>
            <h3 className="course-title">{course.name || 'Untitled Course'}</h3>
            <p className="course-instructor">👨‍🏫 By {course.instructor || 'Unknown Instructor'}</p>
            <p className="course-description">{course.description || 'No description available'}</p>
            <div className="course-meta">
              <span className="course-duration">⏱️ {course.duration || 'N/A'}</span>
              <span className="course-price">₹{course.price || 0}</span>
            </div>
            <button
              className={isInCart(course.id) ? 'add-cart-btn in-cart' : 'add-cart-btn'}
              onClick={() => handleAddToCart(course)}
            >
              {isInCart(course.id) ? '✓ In Cart' : '🛒 Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseBrowser;
