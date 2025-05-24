# Contact Management API with Authentication

A REST API for contact management with user authentication and authorization features.

## 🚀 Live API

The API is live at: [https://nodejs-hw-05-lxwb.onrender.com](https://nodejs-hw-05-lxwb.onrender.com)

## 📋 API Endpoints

### Authentication

1. **User Registration**
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

2. **User Login**
   - **URL**: `https://nodejs-hw-05-lxwb.onrender.com/api/auth/login`
   - **Method**: `POST`
   - **Body**:
   ```json
   {
     "email": "test@example.com",
     "password": "test123456"
   }
   ```
   - **Response**: Returns an access token

### Contact Operations

All contact endpoints require a Bearer token in the `Authorization` header:
```
Authorization: Bearer <access_token>
```

1. **List All Contacts**
   - **URL**: `https://nodejs-hw-05-lxwb.onrender.com/api/contacts`
   - **Method**: `GET`
   - **Query Parameters**:
     - `page` (optional): Page number (default: 1)
     - `perPage` (optional): Items per page (default: 10)
     - `sortBy` (optional): Field to sort by (default: 'name')
     - `sortOrder` (optional): Sort direction ('asc' or 'desc', default: 'asc')
     - `type` (optional): Filter by contact type ('work', 'home', 'personal')
     - `isFavourite` (optional): Filter by favorite status (true/false)

2. **Create New Contact**
   - **URL**: `https://nodejs-hw-05-lxwb.onrender.com/api/contacts`
   - **Method**: `POST`
   - **Body**:
   ```json
   {
     "name": "John Doe",
     "phoneNumber": "1234567890",
     "email": "john@example.com",
     "contactType": "personal",
     "isFavourite": false
   }
   ```

3. **Update Contact**
   - **URL**: `https://nodejs-hw-05-lxwb.onrender.com/api/contacts/:contactId`
   - **Method**: `PATCH`
   - **Body** (all fields are optional):
   ```json
   {
     "name": "John Updated",
     "phoneNumber": "9876543210",
     "email": "john.updated@example.com",
     "contactType": "work",
     "isFavourite": true
   }
   ```

4. **Delete Contact**
   - **URL**: `https://nodejs-hw-05-lxwb.onrender.com/api/contacts/:contactId`
   - **Method**: `DELETE`

## 🔒 Validation Rules

### User Registration
- `name`: Required
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

### Contact Creation/Update
- `name`: Required, 3-20 characters
- `phoneNumber`: Required, 3-20 characters
- `email`: Optional, valid email format
- `contactType`: Required, one of: 'work', 'home', 'personal'
- `isFavourite`: Optional, boolean (default: false)

## ⚙️ Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `409` - Conflict (e.g., email already in use)
- `500` - Server Error

## 🚀 Deployment on Render.com

1. Create a new Web Service on [Render.com](https://render.com)
2. Connect your GitHub repository
3. Configure the following settings:
   - **Build Command**: `npm install`
   - **Start Command**: `node src/index.js`
   - **Environment Variables**:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `NODE_ENV=production`

## 📝 License

MIT 