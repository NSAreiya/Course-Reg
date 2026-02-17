import { createContext, useState, useContext, useEffect } from 'react';
import { courseAPI } from '../utils/api';

const CourseContext = createContext();

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseAPI.getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async (courseData) => {
    try {
      console.log('Creating course with data:', courseData);
      const response = await courseAPI.createCourse(courseData);
      console.log('API response:', response);
      // Backend returns {success, message, data} - extract the course from data
      const newCourse = response.data || response;
      console.log('Adding course to state:', newCourse);
      
      // Refresh courses from backend to ensure sync
      await fetchCourses();
      
      return { success: true, message: 'Course added successfully' };
    } catch (error) {
      console.error('Error adding course:', error);
      return { success: false, message: error.message || 'Failed to add course' };
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await courseAPI.deleteCourse(courseId);
      // Refresh courses from backend to ensure sync
      await fetchCourses();
      return { success: true, message: 'Course deleted successfully' };
    } catch (error) {
      console.error('Error deleting course:', error);
      return { success: false, message: error.message || 'Failed to delete course' };
    }
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, deleteCourse, loading, refreshCourses: fetchCourses }}>
      {children}
    </CourseContext.Provider>
  );
};
