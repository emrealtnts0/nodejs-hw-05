import User from '../models/user.js';
import Session from '../models/session.js';
import createHttpError from 'http-errors';
import { generateTokens, verifyToken } from '../utils/token.js';

const register = async (userData) => {
  const { email } = userData;

  // Check if user with this email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  // Create new user
  const user = await User.create(userData);

  // Return user data without password
  const userResponse = user.toObject();
  delete userResponse.password;

  return userResponse;
};

const login = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid email or password');
  }

  // Delete any existing sessions for this user
  await Session.deleteMany({ userId: user._id });

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Create new session
  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  });

  return {
    accessToken,
    refreshToken
  };
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token not provided');
  }

  // Verify refresh token
  const { userId } = verifyToken(refreshToken);

  // Find user
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  // Find and delete existing session
  const existingSession = await Session.findOne({ userId, refreshToken });
  if (!existingSession) {
    throw createHttpError(401, 'Invalid refresh token');
  }
  await Session.deleteOne({ _id: existingSession._id });

  // Generate new tokens
  const { accessToken, refreshToken: newRefreshToken } = generateTokens(userId);

  // Create new session
  await Session.create({
    userId,
    accessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  });

  return {
    accessToken,
    newRefreshToken
  };
};

const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token not provided');
  }

  // Verify refresh token to get userId
  const { userId } = verifyToken(refreshToken);

  // Delete the session
  const result = await Session.deleteOne({ userId, refreshToken });
  if (result.deletedCount === 0) {
    throw createHttpError(401, 'Invalid refresh token');
  }
};

export const authService = {
  register,
  login,
  refresh,
  logout
}; 