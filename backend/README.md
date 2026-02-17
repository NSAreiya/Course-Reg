# Course Registration System - Spring Boot Backend

A complete RESTful API backend for a course registration system built with Spring Boot, Spring Security, JWT authentication, and Spring Data MongoDB.

## Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin and Student roles with different permissions
- **Course Management**: Full CRUD operations for courses (Admin only)
- **User Management**: Admin can create student and admin accounts
- **Enrollment System**: Students can enroll in courses with duplicate prevention
- **Exception Handling**: Centralized error handling with meaningful responses
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- **Local MongoDB Support**: Optional local MongoDB configuration

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.2**
- **Spring Security 6** with JWT
- **Spring Data MongoDB**
- **MongoDB Atlas** (Cloud Database)
- **Lombok** for cleaner code
- **Maven** for dependency management

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MongoDB Atlas account (free tier) OR local MongoDB installation

## Getting Started

### 1. Clone the repository

```bash
cd backend
```

### 2. Configure MongoDB Atlas

See [MONGODB_SETUP.md](MONGODB_SETUP.md) for detailed MongoDB Atlas setup instructions.

Quick setup:
1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and database user
3. Whitelist your IP address
4. Get your connection string
5. Update `src/main/resources/application.properties`:
```properties
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster-url>/courseregdb?retryWrites=true&w=majority
spring.data.mongodb.database=courseregdb
```

**Alternative - Local MongoDB:**
```properties
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=courseregdb
```properties
# Comment out H2 configuration
# Uncomment MySQL configuration
spring.datasource.url=jdbc:mysql://localhost:3306/courseregdb?createDatabaseIfNotExist=true
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

### 3. Build the application

```bash
mvn clean install
```

### 4. Run the application

```bash
mvn spring-boot:run
```

The server will start at `http://localhost:8080`

## Default Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/signup` | Create new user | Admin only |
| GET | `/api/auth/current-user` | Get current user | Authenticated |

### Courses

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/courses` | Get all courses | Public |
| GET | `/api/courses/{id}` | Get course by ID | Public |
| POST | `/api/courses` | Create new course | Admin only |
| PUT | `/api/courses/{id}` | Update course | Admin only |
| DELETE | `/api/courses/{id}` | Delete course | Admin only |
| GET | `/api/courses/search?query={query}` | Search courses | Public |

### Enrollments

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/enrollments` | Enroll in course | Authenticated |
| GET | `/api/enrollments` | Get all enrollments | Admin only |
| GET | `/api/enrollments/user/{username}` | Get user enrollments | Authenticated |
| GET | `/api/enrollments/{id}` | Get enrollment by ID | Authenticated |

## Request/Response Examples

### Login
**Request:**
```json
POST /api/auth/login
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "admin",
  "role": "ADMIN",
  "message": "Login successful"
}
```

### Create Course
**Request:**
```json
POST /api/courses
Authorization: Bearer <token>

{
  "name": "React Fundamentals",
  "instructor": "Jane Doe",
  "description": "Learn React from scratch",
  "duration": "6 weeks",
  "price": 199.99,
  "image": "⚛️"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": 1,
    "name": "React Fundamentals",
    "instructor": "Jane Doe",
    "description": "Learn React from scratch",
    "duration": "6 weeks",
    "price": 199.99,
    "image": "⚛️"
  }
}
```

### Enroll in Course
**Request:**
```json
POST /api/enrollments
Authorization: Bearer <token>

{
  "name": "John Student",
  "email": "john@example.com",
  "course": "React Fundamentals",
  "username": "john"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully enrolled in the course",
  "data": {
    "id": 1,
    "studentName": "John Student",
    "email": "john@example.com",
    "courseName": "React Fundamentals",
    "username": "john",
    "enrollmentDate": "2024-01-15T10:30:00"
  }
}
```

## Database Collections (MongoDB)

### Users Collection
```json
{
  "_id": "ObjectId",
  "username": "string (unique indexed)",
  "password": "string (BCrypt encrypted)",
  "role": "ADMIN | STUDENT",
  "createdAt": "ISODate"
}
```

### Courses Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "instructor": "string",
  "description": "string",
  "duration": "string",
  "price": "integer",
  "image": "string (emoji)",
  "createdAt": "ISODate"
}
```

### Enrollments Collection
```json
{
  "_id": "ObjectId",
  "studentName": "string",
  "email": "string",
  "courseName": "string",
  "username": "string",
  "enrolledAt": "ISODate"
}
```
**Indexes:**
- Unique compound index on `{email, courseName}` to prevent duplicate enrollments
- Unique index on `users.username`

## Security Features

- **JWT Authentication**: All protected endpoints require a valid JWT token
- **Password Encryption**: BCrypt hashing for secure password storage
- **Role-Based Authorization**: `@PreAuthorize` annotations for method-level security
- **CORS Configuration**: Configured for frontend at `http://localhost:5174`
- **Stateless Sessions**: No server-side session management

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource
- `500 Internal Server Error` - Server error

## Testing

### Using cURL

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get all courses
curl http://localhost:8080/api/courses

# Create course (requires admin token)
curl -X POST http://localhost:8080/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Test Course","instructor":"John Doe","description":"Test","duration":"4 weeks","price":99}'
```

### MongoDB Compass (Database GUI)

To view and manage your MongoDB data:

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your MongoDB Atlas connection string
3. Browse the `courseregdb` database and its collections

**Or use MongoDB Atlas Web UI:**
1. Log into MongoDB Atlas
2. Go to **Collections**
3. Browse your data directly in the browser

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/coursereg/
│   │   │   ├── config/
│   │   │   │   ├── CorsConfig.java
│   │   │   │   ├── DataInitializer.java
│   │   │   │   ├── MongoConfig.java
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── CourseController.java
│   │   │   │   └── EnrollmentController.java
│   │   │   ├── dto/
│   │   │   │   ├── ApiResponse.java
│   │   │   │   ├── AuthResponse.java
│   │   │   │   ├── CourseRequest.java
│   │   │   │   ├── EnrollmentRequest.java
│   │   │   │   ├── LoginRequest.java
│   │   │   │   └── SignupRequest.java
│   │   │   ├── exception/
│   │   │   │   ├── DuplicateResourceException.java
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── ResourceNotFoundException.java
│   │   │   ├── model/
│   │   │   │   ├── Course.java
│   │   │   │   ├── Enrollment.java
│   │   │   │   └── User.java
│   │   │   ├── repository/
│   │   │   │   ├── CourseRepository.java
│   │   │   │   ├── EnrollmentRepository.java
│   │   │   │   └── UserRepository.java
│   │   │   ├── security/
│   │   │   │   ├── CustomUserDetailsService.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── JwtTokenProvider.java
│   │   │   ├── service/
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── CourseService.java
│   │   │   │   └── EnrollmentService.java
│   │   │   └── CourseRegistrationApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please open an issue in the repository.
