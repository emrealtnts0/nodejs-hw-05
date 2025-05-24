import express from 'express';
import cookieParser from 'cookie-parser';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const startServer = () => {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(cookieParser());

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

  // Routes
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