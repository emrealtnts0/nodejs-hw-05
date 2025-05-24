# Contact Management API with Authentication

A REST API for contact management with user authentication and authorization features, implemented as a step-by-step task.

## 🚀 Live API

The API is live at: [https://nodejs-hw-05-lxwb.onrender.com](https://nodejs-hw-05-lxwb.onrender.com)

## 📋 Implementation Steps

### Step 1: Branch Setup
- Created `hw5-auth` branch from `hw4-validation` branch

### Step 2: Database Models

#### User Model
```javascript
{
  name: String,        // required
  email: String,       // required, unique, email format
  password: String,    // required
  createdAt: Date,     // automatically set
  updatedAt: Date      // automatically updated
}
```

#### Session Model
```javascript
{
  userId: String,              // required
  accessToken: String,         // required
  refreshToken: String,        // required
  accessTokenValidUntil: Date, // required (15 minutes)
  refreshTokenValidUntil: Date // required (30 days)
}
```

## 🔐 Authentication Endpoints

### 1. User Registration
- **URL**: `https://nodejs-hw-05-lxwb.onrender.com/api/auth/register`
- **Method**: `POST`
- **Body**:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123456"
}
```
- **Response** (201 Created):
```json
{
  "status": "success",
  "message": "Successfully registered a user!",
  "data": {
    "name": "Test User",
    "email": "test@example.com",
    "createdAt": "2024-03-24T...",
    "updatedAt": "2024-03-24T..."
  }
}
```
- **Error** (409 Conflict): "Email in use"

### 2. User Login
- **URL**: `https://nodejs-hw-05-lxwb.onrender.com/api/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
  "email": "test@example.com",
  "password": "test123456"
}
```
- **Response** (200 OK):
```json
{
  "status": "success",
  "message": "Successfully logged in an user!",
  "data": {
    "accessToken": "eyJhbGciOiJ..."
  }
}
```
- **Features**:
  - Validates email and password
  - Creates new session (deletes old one if exists)
  - Sets refresh token in HTTP-only cookie
  - Returns access token in response body
  - Access token valid for 15 minutes
  - Refresh token valid for 30 days

### 3. Session Refresh
- **URL**: `https://nodejs-hw-05-lxwb.onrender.com/api/auth/refresh`
- **Method**: `POST`
- **Uses**: Refresh token from cookies
- **Response** (200 OK):
```json
{
  "status": "success",
  "message": "Successfully refreshed a session!",
  "data": {
    "accessToken": "eyJhbGciOiJ..."
  }
}
```
- **Features**:
  - Deletes old session
  - Creates new session with new tokens
  - Updates refresh token in cookies
  - Returns new access token

### 4. User Logout
- **URL**: `https://nodejs-hw-05-lxwb.onrender.com/api/auth/logout`
- **Method**: `POST`
- **Response**: 204 No Content
- **Features**:
  - Deletes current session
  - Clears refresh token cookie

## 🔒 Authentication Middleware

The `authenticate` middleware:
- Validates Bearer token in Authorization header
- Verifies token expiration
- Attaches user object to request
- Returns 401 if:
  - Token is missing
  - Token is invalid
  - Token has expired

## ⚙️ Status Codes

- `200` - Success
- `201` - Created
- `204` - No Content (Logout)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `409` - Conflict (email in use)
- `500` - Server Error

## 📝 License

MIT 