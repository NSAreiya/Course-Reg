# 🧪 Testing the Application

## Backend is Running ✅
- URL: http://localhost:8080
- Status: Active with 2 enrollments in database

## Frontend is Running ✅
- URL: http://localhost:5175
- Status: Active

## 📋 Steps to See Enrollments:

### Option 1: Hard Refresh the Browser
1. Open http://localhost:5175 in your browser
2. Press **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac) to hard refresh
3. Login with:
   - Username: `admin`
   - Password: `admin123`
4. Click on "👥 Enrollments" tab
5. You should see 2 enrolled students:
   - Test Student (test@example.com) - Web Development Fundamentals
   - Areiya N S (nsareiya12@gmail.com) - Data Science with Python

### Option 2: Clear Browser Cache
1. Open Developer Tools (F12)
2. Right-click the refresh button → Select "Empty Cache and Hard Reload"
3. Login again
4. View enrollments

### Option 3: Use Incognito/Private Window
1. Open a new Incognito/Private window
2. Go to http://localhost:5175
3. Login with admin credentials
4. View enrollments

## 🐛 If Still Not Working:

Open Browser Console (F12 → Console tab) and check for:
1. "Fetching enrollments..." message
2. "Current enrollments:" with array data
3. Any red error messages

## 🔄 Quick Test in Terminal:

The backend has working data - you can verify with:
```powershell
$loginBody = @{username='admin';password='admin123'} | ConvertTo-Json
$loginResponse = Invoke-WebRequest -Uri http://localhost:8080/api/auth/login -Method POST -Body $loginBody -ContentType 'application/json' -UseBasicParsing
$token = ($loginResponse.Content | ConvertFrom-Json).token
$enrollmentsResponse = Invoke-WebRequest -Uri http://localhost:8080/api/enrollments -Method GET -Headers @{Authorization="Bearer $token"} -UseBasicParsing
$enrollmentsResponse.Content
```

This should return JSON with 2 enrollments.
