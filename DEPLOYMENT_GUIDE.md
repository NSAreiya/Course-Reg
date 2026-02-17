# Full Stack Deployment Configuration

## Quick Setup Guide

### 🚀 Backend Deployment (Render)

**URL:** https://course-reg-n2sw.onrender.com

**Environment Variables to Set in Render:**

```env
MONGODB_URI=mongodb+srv://nsareiya12_db_user:Areiya%232005@cluster0.4jk2gyg.mongodb.net/?appName=Cluster0
MONGODB_DATABASE=courseregdb
JWT_SECRET=5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=https://course-reg-eight.vercel.app,http://localhost:5173
SPRING_PROFILES_ACTIVE=prod
LOG_LEVEL=INFO
```

**Steps:**
1. Push code to GitHub/GitLab
2. Create new Web Service on Render
3. Select Docker runtime
4. Set root directory to `backend`
5. Add environment variables above
6. Deploy!

---

### 🎨 Frontend Deployment (Vercel)

**Current URL:** https://course-reg-eight.vercel.app/

**Environment Variable to Set in Vercel:**

```env
VITE_API_BASE_URL=https://course-reg-n2sw.onrender.com/api
```

**Steps:**
1. Push code to GitHub/GitLab (should be done)
2. Import project in Vercel
3. Set root directory to `frontend`
4. Set framework preset to `Vite`
5. Add environment variable above
6. Deploy!

---

## ✅ Verification Checklist

After both deployments:

### Backend (Render):
- [ ] Service is running (check Render dashboard)
- [ ] Test endpoint: `https://course-reg-n2sw.onrender.com/api/courses`
- [ ] MongoDB Atlas allows connections from 0.0.0.0/0
- [ ] CORS includes Vercel domain

### Frontend (Vercel):
- [ ] Site loads: https://course-reg-eight.vercel.app/
- [ ] `VITE_API_BASE_URL` is set correctly
- [ ] Can login successfully
- [ ] API calls work (check browser console)

### Integration:
- [ ] Login works end-to-end
- [ ] Course listing displays
- [ ] Shopping cart functions
- [ ] Enrollment completes successfully
- [ ] Admin dashboard shows enrollments

---

## 🔧 Configuration Summary

| Component | Location | Value |
|-----------|----------|-------|
| **Frontend URL** | Vercel | `https://course-reg-eight.vercel.app` |
| **Backend URL** | Render | `https://course-reg-n2sw.onrender.com` |
| **Database** | MongoDB Atlas | `cluster0.4jk2gyg.mongodb.net` |
| **Frontend → Backend** | Vercel env var | `VITE_API_BASE_URL` |
| **Backend → Frontend** | Render env var | `CORS_ALLOWED_ORIGINS` |

---

## 🚨 Important Notes

### Free Tier Limitations:

**Render:**
- Cold start delay: 30-60 seconds after 15 minutes of inactivity
- Solution: Upgrade to paid plan ($7/month) for always-on

**Vercel:**
- No cold starts
- Fast global CDN
- Automatic HTTPS

### MongoDB Atlas:
- Ensure Network Access allows all IPs: `0.0.0.0/0`
- Or add specific Render IP ranges

### CORS Configuration:
Must be set on **both** sides:
1. Frontend tells browser where to send requests (VITE_API_BASE_URL)
2. Backend tells browser which domains can access it (CORS_ALLOWED_ORIGINS)

---

## 🔄 Update Process

**When you make changes:**

1. **Backend changes:**
   ```bash
   git add backend/
   git commit -m "Update backend"
   git push
   ```
   → Render auto-deploys

2. **Frontend changes:**
   ```bash
   git add frontend/
   git commit -m "Update frontend"
   git push
   ```
   → Vercel auto-deploys

---

## 📞 Support Links

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/

---

## 🧪 Testing Locally with Production API

Create `frontend/.env.local`:
```env
VITE_API_BASE_URL=https://course-reg-n2sw.onrender.com/api
```

Then run:
```bash
cd frontend
npm run dev
```

This tests your local frontend against the production backend.
