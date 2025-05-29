import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { authSchemas } from '../schemas/auth.js';
import { authController } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', validateBody(authSchemas.registerSchema), authController.register);
router.post('/login', validateBody(authSchemas.loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.post('/send-reset-email', validateBody(authSchemas.sendResetEmailSchema), authController.sendResetEmail);
router.post('/reset-pwd', validateBody(authSchemas.resetPasswordSchema), authController.resetPassword);

export default router; 