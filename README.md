# Contact Management API with Authentication

This project implements a Contact Management API with user authentication features. The API allows users to register, login, manage their sessions, and handle their contacts.

## 🚀 Live API

The API is live at: [https://nodejs-hw-05-lxwb.onrender.com](https://nodejs-hw-05-lxwb.onrender.com)

## 📋 Implementation Steps

### Step 1: Branch Setup
- Created `hw5-auth` branch from `hw4-validation`
- All development is done in the `hw5-auth` branch

### Step 2: Database Models

#### User Model
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

#### Session Model
```javascript
{
  userId: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  accessTokenValidUntil: { type: Date, required: true },
  refreshTokenValidUntil: { type: Date, required: true }
}
```

### Step 3: User Registration
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: 201 Created
  ```json
  {
    "status": "success",
    "message": "Successfully registered a user!",
    "data": {
      "name": "string",
      "email": "string",
      "_id": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```
- Features:
  - Password hashing with bcrypt
  - Email uniqueness validation
  - Data validation
  - Error handling (409 for duplicate email)

### Step 4: User Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: 200 OK
  ```json
  {
    "status": "success",
    "message": "Successfully logged in an user!",
    "data": {
      "accessToken": "string"
    }
  }
  ```
- Features:
  - Access token (15 minutes validity)
  - Refresh token (30 days validity, stored in HTTP-only cookie)
  - Session management
  - Error handling (401 for invalid credentials)

### Step 5: Session Refresh
- **Endpoint**: `POST /api/auth/refresh`
- **Request**: Requires refresh token in cookies
- **Response**: 200 OK
  ```json
  {
    "status": "success",
    "message": "Successfully refreshed a session!",
    "data": {
      "accessToken": "string"
    }
  }
  ```
- Features:
  - Automatic session renewal
  - New access token generation
  - Cookie-based refresh token management

### Step 6: User Logout
- **Endpoint**: `POST /api/auth/logout`
- **Request**: Requires valid session
- **Response**: 204 No Content
- Features:
  - Session deletion
  - Cookie cleanup

### Step 7: Authentication Middleware
- **Name**: `authenticate`
- **Location**: `src/middlewares/authenticate.js`
- **Features**:
  - Bearer token validation
  - Token expiration check
  - User identification
  - Error handling (401 for invalid/expired tokens)
- **Usage**: Applied to all contact routes

### Step 8: Contact Model Update
- Added `userId` field to Contact model
- Updated contact operations to be user-specific
- Modified routes to use authenticated user's ID
- Features:
  - User-specific contact management
  - Automatic userId assignment
  - Data isolation between users

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Session refresh
- `POST /api/auth/logout` - User logout

### Contacts (All require authentication)
- `POST /api/contacts` - Create contact
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID
- `PATCH /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

## ⚙️ Status Codes

- `200` - Success
- `201` - Created
- `204` - No Content (Logout)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `409` - Conflict (email in use)

## 📝 License

MIT 

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with required environment variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/contacts_db
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- dotenv
- createHttpError
- Joi (validation) 