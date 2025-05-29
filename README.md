# Contact Management API with Email and Image Upload

This project is a REST API that includes user authentication, password reset functionality, and contact management features. It integrates with Brevo email service and Cloudinary image upload service.

## 🚀 Features

- User authentication (register, login, logout)
- JWT-based session management
- Password reset via email
- Contact management (CRUD operations)
- Photo upload and management (Cloudinary integration)
- Email sending (Brevo SMTP integration)

## 📋 Requirements

- Node.js (v18 or higher)
- MongoDB
- Brevo account (for email sending)
- Cloudinary account (for image upload)

## 🔧 Installation

1. Clone the project:
```bash
git clone <repository-url>
cd nodejs-hw-06
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env` file and set required variables:
```env
# Server
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/your-database-name

# JWT
JWT_SECRET=your-jwt-secret

# Email (Brevo)
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-brevo-username
SMTP_PASSWORD=your-brevo-password
SMTP_FROM=your-verified-email@domain.com

# Frontend Domain
APP_DOMAIN=http://localhost:3000/auth

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

5. Start the application:
```bash
npm start
```

## 📚 API Documentation

### Authentication Endpoints

#### User Registration
```http
POST /api/auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
}
```

#### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

#### Send Password Reset Email
```http
POST /api/auth/send-reset-email
Content-Type: application/json

{
    "email": "user@example.com"
}
```

#### Reset Password
```http
POST /api/auth/reset-pwd
Content-Type: application/json

{
    "token": "jwt-token-from-email",
    "password": "new-password123"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <access-token>
```

### Contact Management Endpoints

#### Create Contact (with Photo)
```http
POST /api/contacts
Authorization: Bearer <access-token>
Content-Type: multipart/form-data

{
    "name": "Contact Name",
    "email": "contact@example.com",
    "phone": "1234567890",
    "photo": <file>
}
```

#### Update Contact (with Photo)
```http
PATCH /api/contacts/:contactId
Authorization: Bearer <access-token>
Content-Type: multipart/form-data

{
    "name": "Updated Name",
    "photo": <file>
}
```

## 🔐 Security

- All sensitive data is stored in `.env` file
- JWT tokens are valid for 15 minutes
- Password reset tokens are valid for 5 minutes
- Passwords are hashed before storage
- All API endpoints (except registration and login) require authentication

## 📧 Email Template

The password reset email includes:
- User's name
- Password reset link
- Token expiration information
- Security warnings

## 🖼️ Image Upload

- Image upload using Cloudinary service
- Supported formats: JPG, PNG, GIF
- Maximum file size: 5MB
- Automatic image optimization

## ⚠️ Error Codes

- 400: Bad Request (validation error)
- 401: Unauthorized (token error)
- 404: Not Found
- 409: Conflict (e.g., email already in use)
- 500: Server Error

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- <test-file-name>
```

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 