<h1 align="center">NODEJS-HW-06</h1>

<p align="center">Empowering Secure Connections, Simplifying User Management</p>

<p align="center">
  <!-- Dynamic badges - You may need to customize these for your specific GitHub repository -->
  <img src="https://img.shields.io/github/last-commit/emrealtnts0/nodejs-hw-06?color=blue&label=last%20commit" alt="Last Commit">
  <img src="https://img.shields.io/github/languages/top/emrealtnts0/nodejs-hw-06?color=orange&label=JavaScript" alt="JavaScript Percentage">
  <img src="https://img.shields.io/github/languages/count/emrealtnts0/nodejs-hw-06?color=green&label=languages" alt="Languages Count">
</p>

<p align="center">Built with the tools and technologies:</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm">
  <img src="https://img.shields.io/badge/Cloudinary-3399FF?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint">
  <img src="https://img.shields.io/badge/YAML-CB171E?style=for-the-badge&logo=yaml&logoColor=white" alt="YAML">
</p>

## Project Overview

This project is a REST API that includes user authentication, password reset functionality, and robust contact management features. It seamlessly integrates with Brevo for email services and Cloudinary for image upload and management.

## Features

- User authentication (register, login, logout)
- JWT-based session management
- Password reset via email
- Contact management (CRUD operations)
- Photo upload and management (Cloudinary integration)
- Email sending (Brevo SMTP integration)

## Installation

1.  **Clone the project**:
    ```bash
    git clone <repository-url>
    cd nodejs-hw-06
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Create `.env` file**:
    ```bash
    cp .env.example .env
    ```
4.  **Configure Environment Variables**: Edit the `.env` file and set the required variables.
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
5.  **Start the application**:
    ```bash
    npm start
    ```

## API Endpoints

### Authentication

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in an existing user.
*   `POST /api/auth/send-reset-email`: Request a password reset email.
*   `POST /api/auth/reset-pwd`: Reset user password using a token.
*   `POST /api/auth/logout`: Log out the current user.

### Contact Management

*   `GET /api/contacts`: Retrieve all contacts (with optional query parameters for pagination, limit, and favorite status).
*   `GET /api/contacts/:contactId`: Retrieve a specific contact by ID.
*   `POST /api/contacts`: Create a new contact (supports photo upload).
*   `PATCH /api/contacts/:contactId`: Update an existing contact (supports photo update).
*   `DELETE /api/contacts/:contactId`: Delete a contact by ID.

## Security

*   All sensitive data is configured via `.env` file.
*   JWT tokens are used for session management with defined expiration.
*   Password reset tokens have a limited validity period.
*   Passwords are securely hashed before storage.
*   Most API endpoints require authentication with a Bearer token.

## Email Service

The application integrates with Brevo for email sending, particularly for password reset functionalities. Email templates are designed to be informative and secure.

## Image Upload

Image uploads are handled via Cloudinary, supporting various formats with automatic optimization and size limits.

## License

This project is licensed under the MIT License. See the LICENSE file for details. 
