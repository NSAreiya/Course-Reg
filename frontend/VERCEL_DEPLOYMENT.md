# Vercel Deployment Guide for Course Registration Frontend

## Prerequisites
1. A Vercel account (sign up at https://vercel.com)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Backend deployed and running (e.g., on Render)

## Deployment Steps

### 1. Create a New Project on Vercel

1. Log in to your Vercel dashboard
2. Click "Add New..." and select "Project"
3. Import your Git repository
4. Select the repository containing your project

### 2. Configure Build Settings

**Framework Preset:** Vite

**Root Directory:** `frontend`

**Build Command:** `npm run build` (auto-detected)

**Output Directory:** `dist` (auto-detected)

**Install Command:** `npm install` (auto-detected)

### 3. Environment Variables

Add the following environment variable in Vercel:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `VITE_API_BASE_URL` | `https://your-backend.onrender.com/api` | Your backend API URL |

**How to add:**
1. In project settings, go to "Environment Variables"
2. Add `VITE_API_BASE_URL` with your Render backend URL
3. Apply to Production, Preview, and Development environments

### 4. Deploy

1. Click "Deploy"
2. Vercel will:
   - Install dependencies
   - Build your React app with Vite
   - Deploy to CDN
   - Provide a URL like: `https://your-app.vercel.app`

Your frontend is now live at: **https://course-reg-eight.vercel.app/**

### 5. Update Backend CORS

Make sure your backend (on Render) allows requests from your Vercel domain:

In Render, set the environment variable:
```
CORS_ALLOWED_ORIGINS=https://course-reg-eight.vercel.app
```

This is already configured in your backend's `application.properties`.

### 6. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update CORS in backend to include custom domain

## Testing Deployment

1. Visit your Vercel URL: https://course-reg-eight.vercel.app/
2. Try logging in with admin credentials
3. Create a course
4. Test enrollment flow

## Automatic Deployments

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every pull request gets a preview URL

## Environment Variables for Different Environments

**Local Development (.env.local):**
```env
# Leave empty or don't create - will use localhost:8080
```

**Vercel Production:**
```env
VITE_API_BASE_URL=https://course-registration-backend.onrender.com/api
```

## Important Notes

### Vite Environment Variables
- Must start with `VITE_` to be exposed to the client
- Accessed via `import.meta.env.VITE_*`
- Changes require rebuild to take effect

### CORS Configuration
Both frontend and backend domains must be configured:

**Backend (Render):**
```env
CORS_ALLOWED_ORIGINS=https://course-reg-eight.vercel.app,http://localhost:5173
```

**Allows requests from:**
- Your production frontend (Vercel)
- Local development

### Free Tier
- Unlimited bandwidth
- Automatic HTTPS
- Global CDN
- 100 GB bandwidth per month

## Troubleshooting

### API Calls Failing
1. Check `VITE_API_BASE_URL` is set correctly in Vercel
2. Verify backend URL is accessible
3. Check browser console for CORS errors
4. Ensure backend CORS includes frontend domain

### Build Failures
1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`

### Environment Variables Not Working
1. Must start with `VITE_`
2. Redeploy after adding new variables
3. Check they're set for correct environment (Production/Preview)

### 404 on Page Refresh
Add `vercel.json` in frontend root (if not exists):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Updating Your Application

1. Push changes to your repository
2. Vercel automatically builds and deploys
3. Preview deployments available for PRs
4. Promote to production when ready

## Monitoring

**Vercel Dashboard provides:**
- Build logs
- Runtime logs
- Analytics (page views, performance)
- Error tracking

## Useful Commands

**Local preview of production build:**
```bash
npm run build
npm run preview
```

**Check environment variables locally:**
Create a `.env.local` file (not committed to git):
```env
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

## Support

- Vercel Documentation: https://vercel.com/docs
- Vite Environment Variables: https://vitejs.dev/guide/env-and-mode.html
- Community: https://github.com/vercel/vercel/discussions
