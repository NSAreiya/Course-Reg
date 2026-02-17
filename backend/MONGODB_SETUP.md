# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for the Course Registration Backend.

## Steps to Configure MongoDB Atlas

### 1. Create a MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster (Free tier is sufficient for development)

### 2. Create a Database User
1. In the Atlas dashboard, go to **Database Access**
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Set username and password (remember these!)
5. Set **Database User Privileges** to "Atlas admin" or "Read and write to any database"
6. Click **Add User**

### 3. Whitelist Your IP Address
1. Go to **Network Access** in the Atlas dashboard
2. Click **Add IP Address**
3. Either:
   - Click **Allow Access from Anywhere** (0.0.0.0/0) for development
   - Or add your specific IP address for production
4. Click **Confirm**

### 4. Get Your Connection String
1. Go to **Clusters** in the Atlas dashboard
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Select **Java** as the driver and version **4.3 or later**
5. Copy the connection string (it will look like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 5. Update application.properties
1. Open `src/main/resources/application.properties`
2. Replace the MongoDB URI with your connection string:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/courseregdb?retryWrites=true&w=majority
   spring.data.mongodb.database=courseregdb
   ```
3. Replace `<username>` and `<password>` with your database user credentials
4. Replace `cluster0.xxxxx.mongodb.net` with your actual cluster address

### Example Configuration

```properties
# MongoDB Atlas Configuration
spring.data.mongodb.uri=mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/courseregdb?retryWrites=true&w=majority
spring.data.mongodb.database=courseregdb
```

## Important Notes

⚠️ **Security Best Practices:**
- Never commit your MongoDB credentials to version control
- Use environment variables for sensitive data in production:
  ```properties
  spring.data.mongodb.uri=${MONGODB_URI}
  ```
- Set the environment variable:
  ```bash
  # Windows
  set MONGODB_URI=mongodb+srv://...
  
  # Linux/Mac
  export MONGODB_URI=mongodb+srv://...
  ```

## Testing the Connection

After updating the configuration:

1. Clean and rebuild the project:
   ```bash
   mvn clean install
   ```

2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

3. Check the logs for successful connection:
   ```
   INFO - Opened connection [connectionId{...}] to cluster0.xxxxx.mongodb.net:27017
   INFO - Started CourseRegistrationApplication in X seconds
   ```

4. Test the API:
   ```bash
   curl http://localhost:8080/api/courses
   ```

## Troubleshooting

### Connection Timeout
- Check if your IP address is whitelisted in Network Access
- Verify your internet connection allows outbound connections to MongoDB Atlas

### Authentication Failed
- Double-check your username and password
- Ensure the user has proper database privileges
- Make sure special characters in password are URL-encoded

### Database Not Found
- The database will be created automatically on first write operation
- Ensure the database name in the URI matches `spring.data.mongodb.database`

## Collections

The application will automatically create these collections:
- `users` - User accounts (admin and students)
- `courses` - Course information
- `enrollments` - Student course enrollments

## Viewing Your Data

1. In MongoDB Atlas, go to **Collections**
2. Select your cluster
3. Browse the `courseregdb` database
4. View and manage your collections

## MongoDB Compass (Optional)

For a desktop GUI:
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Use your connection string to connect
3. Browse and query your data visually

## Indexes

The application automatically creates:
- Unique index on `users.username`
- Compound unique index on `enrollments.{email, courseName}`

These ensure data integrity and improve query performance.
