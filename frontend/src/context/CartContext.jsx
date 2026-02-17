import { createContext, useState, useContext, useEffect } from 'react';
import { enrollmentAPI } from '../utils/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch enrollments from backend
  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.log('No auth token found, skipping enrollment fetch');
        setEnrollments([]);
        return;
      }
      const data = await enrollmentAPI.getAllEnrollments();
      console.log('Fetched enrollments:', data);
      setEnrollments(data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch enrollments when component mounts if user is logged in
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      fetchEnrollments();
    }
  }, []);

  const addToCart = (course) => {
    const existingItem = cartItems.find((item) => item.id === course.id);
    if (existingItem) {
      // Item already in cart, don't add again
      return;
    } else {
      setCartItems([...cartItems, { ...course, quantity: 1 }]);
    }
  };

  const removeFromCart = (courseId) => {
    setCartItems(cartItems.filter((item) => item.id !== courseId));
  };

  const updateQuantity = (courseId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(courseId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === courseId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const enrollCourse = async (name, email, course, username) => {
    try {
      const enrollmentData = {
        name,
        email,
        course,
        username
      };
      
      await enrollmentAPI.createEnrollment(enrollmentData);
      
      // Refresh enrollments list
      await fetchEnrollments();
      
      return { success: true, message: 'Successfully enrolled in the course' };
    } catch (error) {
      console.error('Enrollment error:', error);
      return { success: false, message: error.message || 'Failed to enroll in course' };
    }
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getTotalItems = () => {
    return cartItems.length;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        enrollments,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        enrollCourse,
        getTotal,
        getTotalItems,
        refreshEnrollments: fetchEnrollments,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
