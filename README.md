<h1 align="center">NODEJS-HW-05</h1>

<p align="center">Empowering Secure Connections, Simplifying User Management</p>

<p align="center">
  <!-- Dynamic badges - You may need to customize these for your specific GitHub repository -->
  <img src="https://img.shields.io/github/last-commit/emrealtnts0/nodejs-hw-05?color=blue&label=last%20commit" alt="Last Commit">
  <img src="https://img.shields.io/github/languages/top/emrealtnts0/nodejs-hw-05?color=orange&label=JavaScript" alt="JavaScript Percentage">
  <img src="https://img.shields.io/github/languages/count/emrealtnts0/nodejs-hw-05?color=green&label=languages" alt="Languages Count">
</p>

<p align="center">Built with the tools and technologies:</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm">
  <img src="https://img.shields.io/badge/Bcrypt-2E7D32?style=for-the-badge&logo=bcrypt&logoColor=white" alt="Bcrypt">
  <img src="https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JSON Web Tokens">
  <img src="https://img.shields.io/badge/Joi-E43B3D?style=for-the-badge&logo=joi&logoColor=white" alt="Joi">
  <img src="https://img.shields.io/badge/Pino-FF0000?style=for-the-badge&logo=pino&logoColor=white" alt="Pino">
  <img src="https://img.shields.io/badge/Cors-222222?style=for-the-badge&logo=cors&logoColor=white" alt="Cors">
  <img src="https://img.shields.io/badge/.env-ECD53F?style=for-the-badge&logo=dot-env&logoColor=black" alt=".env">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint">
  <img src="https://img.shields.io/badge/YAML-CB171E?style=for-the-badge&logo=yaml&logoColor=white" alt="YAML">
</p>

## Project Overview

This project implements a robust REST API focusing on user authentication and contact management. Key features include secure user registration, login with JWT-based session management, and comprehensive CRUD operations for contacts. The API ensures secure connections and streamlines user data handling with user-specific contact isolation.

## Features Implemented in this Project

*   **User Authentication**: Secure registration, login, logout functionalities.
*   **Session Management**: JWT-based access and refresh tokens for secure sessions.
*   **Contact Management**: Full CRUD operations for contacts with user isolation.
*   **Data Validation**: Robust input validation for all API endpoints.
*   **Middleware for Authentication**: Custom middleware to secure contact routes.
*   **User-Specific Contacts**: Ensures users can only manage their own contacts.

## Installation

1.  **Clone the project**:
    ```bash
    git clone <repository-url>
    cd nodejs-hw-05
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
    ```
5.  **Start the application**:
    ```bash
    npm start
    ```

## API Endpoints

### Authentication

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in an existing user and create a session with JWTs.
*   `POST /api/auth/refresh`: Refresh an expired session using a refresh token.
*   `POST /api/auth/logout`: Invalidate the current user session.

### Contact Management

*   `GET /api/contacts`: Retrieve all contacts for the authenticated user.
*   `GET /api/contacts/:contactId`: Retrieve a specific contact by ID for the authenticated user.
*   `POST /api/contacts`: Create a new contact for the authenticated user.
*   `PATCH /api/contacts/:contactId`: Update an existing contact by ID for the authenticated user.
*   `DELETE /api/contacts/:contactId`: Delete a contact by ID for the authenticated user.

## Security Considerations

*   **Environment Variables**: All sensitive data is managed through `.env` files.
*   **JWT Authentication**: Utilizes JSON Web Tokens for secure session management.
*   **Password Hashing**: Passwords are securely hashed using `bcrypt` before storage.
*   **Token Expiration**: Access tokens (15 minutes) and refresh tokens (30 days) have defined validity periods.
*   **Route Protection**: Most API endpoints require `Bearer` token authentication.
*   **User Isolation**: Ensures users can only access and modify their own contacts.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
