# 🎓 Course Registration Website

A comprehensive course registration system with role-based access control for administrators and students.

## 🌟 Features

### Authentication System
- **Login Page**: Secure login for both admin and student accounts
- **Signup Page**: Admin-only account creation functionality
- **Role-based Access Control**: Different dashboards for admin and student users

### Admin Features
- ✅ Create new student and admin accounts
- 👥 View all enrolled students in a detailed table
- 📊 Track total number of enrollments
- 🔐 Full administrative control

### Student Features
- 📚 **Browse Courses**: View all available courses with details
  - Course name, instructor, description
  - Duration and pricing information
  - Visual icons for each course
- 🛒 **Shopping Cart**: 
  - Add/remove courses
  - Adjust quantities
  - View order summary with pricing
  - Proceed to payment
- ✍️ **Course Registration**:
  - Register for courses with name and email
  - Duplicate enrollment prevention
  - Instant confirmation

## 📋 Available Courses

1. **PHP** - John Doe (8 weeks, ₹4999)
2. **MERN Stack** - Jane Smith (12 weeks, ₹7999)
3. **Java** - Michael Johnson (10 weeks, ₹5999)
4. **Spring Boot** - Sarah Williams (10 weeks, ₹6999)
5. **Python** - David Brown (8 weeks, ₹4999)

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system
- npm or yarn package manager

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit: `http://localhost:5174/`

## 🔐 Default Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

*Note: After logging in as admin, you can create additional accounts.*

## 💻 Usage Guide

### For Administrators

1. Login with admin credentials
2. View the enrolled students dashboard
3. Click "Create Account" to add new users (admin or student)
4. Monitor enrollments in real-time

### For Students

1. Login with your student credentials (created by admin)
2. **Browse Courses**: 
   - View all available courses
   - Click "Add to Cart" to select courses
3. **Shopping Cart**:
   - Review selected courses
   - Adjust quantities as needed
   - Proceed to payment
4. **Register Course**:
   - Fill in your name and email
   - Select a course from dropdown
   - Submit registration (no duplicates allowed)

## 🎨 Design Features

- **Modern Gradient UI**: Purple-themed gradient design
- **Responsive Layout**: Works on desktop and mobile devices
- **Smooth Animations**: Fade-in effects and hover transitions
- **Card-based Components**: Clean, organized information display
- **Interactive Elements**: Dynamic buttons and form inputs
- **Professional Typography**: Clear, readable fonts throughout

## 🔒 Security Features

- Password-protected accounts
- Role-based access control
- Admin-only account creation
- Duplicate enrollment prevention
- Local storage for data persistence

## 📱 Responsive Design

The website is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 8.0.0
- **Styling**: Custom CSS with modern gradients
- **State Management**: React Context API
- **Data Persistence**: Local Storage

## 📦 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx & Login.css
│   │   ├── Signup.jsx
│   │   ├── StudentDashboard.jsx & StudentDashboard.css
│   │   ├── AdminDashboard.jsx & AdminDashboard.css
│   │   ├── CourseBrowser.jsx & CourseBrowser.css
│   │   ├── ShoppingCart.jsx & ShoppingCart.css
│   │   └── CourseRegistration.jsx & CourseRegistration.css
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── courses.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

## 🌈 Color Scheme

- Primary Gradient: `#667eea` to `#764ba2`
- Success: `#20bf6b` to `#26d07c`
- Background: `#f8f9fa` to `#e9ecef`
- Text: `#333` (dark) and `#666` (medium)

## 🎯 Key Highlights

✅ Complete authentication system with login/signup
✅ Dual role support (Admin and Student)
✅ Shopping cart with quantity management
✅ Course registration with validation
✅ Duplicate enrollment prevention
✅ Real-time enrollment tracking
✅ Beautiful, modern UI design
✅ Fully responsive layout
✅ Smooth animations and transitions
✅ Data persistence across sessions

## 📝 Notes

- All data is stored in browser's local storage
- Admin must be logged in to create new accounts
- Students cannot enroll in the same course twice
- Cart is persistent across page refreshes
- Enrollments are tracked with timestamps

---

**Enjoy your course registration experience! 🎉**
