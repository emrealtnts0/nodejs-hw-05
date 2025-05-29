import { authService } from '../services/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await authService.register({ name, email, password });

  res.status(201).json({
    status: 'success',
    message: 'Successfully registered a user!',
    data: user
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await authService.login(email, password);

  // Set refresh token in HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  res.status(200).json({
    status: 'success',
    message: 'Successfully logged in an user!',
    data: { accessToken }
  });
};

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  const { accessToken, newRefreshToken } = await authService.refresh(refreshToken);

  // Set new refresh token in HTTP-only cookie
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  res.status(200).json({
    status: 'success',
    message: 'Successfully refreshed a session!',
    data: { accessToken }
  });
};

const logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  await authService.logout(refreshToken);

  // Clear the refresh token cookie
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  res.status(204).send();
};

export const authController = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  refresh: ctrlWrapper(refresh),
  logout: ctrlWrapper(logout)
}; 