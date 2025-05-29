import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const startServer = () => {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // Root route
  app.get('/', (req, res) => {
    res.json({
      status: 'success',
      message: 'Welcome to Contact Management API',
      data: {
        version: '1.0.0',
        endpoints: {
          auth: '/api/auth',
          contacts: '/api/contacts'
        },
        documentation: 'Please refer to README.md for API documentation'
      }
    });
  });

  // Reset password page route
  app.get('/auth/reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reset-password.html'));
  });

  // API Routes
  app.use('/api/contacts', contactsRouter);
  app.use('/api/auth', authRouter);

  // 404 Handler
  app.use(notFoundHandler);

  // Error Handler
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return server;
};