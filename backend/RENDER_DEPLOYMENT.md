# Render Deployment Guide for Course Registration Backend

## Prerequisites
1. A Render account (sign up at https://render.com)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. MongoDB Atlas connection string

## Deployment Steps

### 1. Create a New Web Service on Render

1. Log in to your Render dashboard
2. Click "New +" and select "Web Service"
3. Connect your Git repository
4. Choose the repository containing your project

### 2. Configure the Web Service

**Basic Settings:**
- **Name:** `course-registration-backend`
- **Region:** Choose closest to your users (e.g., Oregon, Frankfurt)
- **Branch:** `main` (or your default branch)
- **Root Directory:** `backend`
- **Runtime:** Docker
- **Plan:** Free (or paid for better performance)

**Build Settings:**
- **Dockerfile Path:** `./Dockerfile`
- Render will automatically detect and use the Dockerfile

### 3. Environment Variables

Add the following environment variables in Render dashboard:

| Key | Value | Notes |
|-----|-------|-------|
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/` | Your MongoDB Atlas connection string |
| `MONGODB_DATABASE` | `courseregdb` | Database name |
| `JWT_SECRET` | (Auto-generated or custom) | Secret key for JWT tokens (64+ characters) |
| `JWT_EXPIRATION` | `86400000` | Token expiration (24 hours in ms) |
| `CORS_ALLOWED_ORIGINS` | `https://course-reg-eight.vercel.app` | Your frontend domain (comma-separated for multiple) |
| `SPRING_PROFILES_ACTIVE` | `prod` | Activate production profile |
| `LOG_LEVEL` | `INFO` | Set to `DEBUG` for troubleshooting |

### 4. Health Check

- **Health Check Path:** `/api/courses`
- Render will ping this endpoint to verify the service is running

### 5. Deploy

1. Click "Create Web Service"
2. Render will:
   - Pull your code from Git
   - Build the Docker image
   - Deploy the container
   - Provide a URL like: `https://course-registration-backend.onrender.com`

### 6. Update Frontend

Update your frontend API base URL to point to the Render URL:

```javascript
// In your frontend API configuration
const API_BASE_URL = 'https://course-registration-backend.onrender.com/api';
```

### 7. Update CORS

Add your frontend domain to the `CORS_ALLOWED_ORIGINS` environment variable:

```
https://course-reg-eight.vercel.app,http://localhost:5173
```

## Testing Deployment

Test your deployed API:

```bash
# Check if API is running
curl https://your-app.onrender.com/api/courses

# Test authentication
curl -X POST https://your-app.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## Important Notes

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds (cold start)
- 750 hours/month free tier limit

### Cold Start Solutions
1. Upgrade to a paid plan ($7/month) for always-on service
2. Use a cron job to ping the service every 10 minutes
3. Implement a loading indicator in frontend for cold starts

### MongoDB Atlas
Ensure your MongoDB Atlas cluster allows connections from anywhere:
1. Go to Network Access in MongoDB Atlas
2. Add IP Address: `0.0.0.0/0` (allows all IPs)
3. Or add Render's IP ranges

## Troubleshooting

### Build Fails
- Check Dockerfile syntax
- Verify `pom.xml` is correct
- Check Render build logs

### Application Won't Start
- Verify environment variables are set
- Check `MONGODB_URI` is correct
- Review application logs in Render dashboard

### CORS Errors
- Add frontend domain to `CORS_ALLOWED_ORIGINS`
- Include protocol (https://) in the domain

### Database Connection Issues
- Verify MongoDB Atlas allows connections from all IPs
- Check connection string format
- Ensure password is URL-encoded

## Alternative: Using render.yaml

You can use the included `render.yaml` file for automated deployment:

1. Place `render.yaml` in your repository root
2. In Render dashboard, select "Blueprint" deployment
3. Render will read configuration from the YAML file

## Monitoring

- **Logs:** Available in Render dashboard under "Logs" tab
- **Metrics:** CPU, Memory, Request metrics in dashboard
- **Alerts:** Set up email alerts for service failures

## Updating Your Application

1. Push changes to your Git repository
2. Render automatically detects changes and redeploys
3. Monitor deployment progress in dashboard

## Support

- Render Documentation: https://render.com/docs
- Community Forum: https://community.render.com
