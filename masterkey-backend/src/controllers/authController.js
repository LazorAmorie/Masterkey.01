// authController.js
// --------------------------------------------------
// Handles authentication-related business logic:
// - User signup
// - User login
// - Fetching authenticated user profile
//
// NOTE:
// This file does NOT define routes.
// It ONLY defines what happens WHEN auth routes are hit.
// --------------------------------------------------

import bcrypt from "bcryptjs";// bcrypt is intentionally NOT used directly Password hashing & comparison are delegated to the User model 
import jwt from "jsonwebtoken";// Used to generate stateless authentication tokens (JWT)
import Joi from "joi";// Backend request validation (never trust frontend validation alone)
import dotenv from "dotenv";// Loads environment variables from .env
import User from "../models/userModel.js";// Sequelize User model (handles DB interaction)
import logger from "../utils/logger.js";// Centralized logging utility (avoids console.log chaos)

dotenv.config();// Ensure environment variables are available before use

// --------------------------------------------------
// Validation Schemas
// --------------------------------------------------
// These schemas protect the backend from malformed or malicious input.
// Even if frontend validation fails or is bypassed,
// the backend will still enforce these rules.
// --------------------------------------------------
const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9])"))
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),

  // Backend fallback for confirm password.
  // Even if frontend validation breaks, this prevents mismatched passwords.    

  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Passwords do not match",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/**
 * Generate JWT Token
 * @param {string} userId - User ID
 * @returns {string} - JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "7d",
  });
};

/**
 * Generates a unique wallet address for a new user
 * NOTE:
 * This is business logic tied to user creation,
 * not database logic.
 */
const generateWalletAddress = () => {
  const prefix = "MKEY";

// Random alphanumeric string for uniqueness  
  const randomPart =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return `${prefix}-${randomPart.toUpperCase()}`;
};

// --------------------------------------------------
// Controllers
// -------------------------------------------------

/**
 * Signup Controller
 * Register a new user
 */
export const signup = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = signupSchema.validate(req.body);

    if (error) {
      // Stop execution early if validation fails
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    }

    // Extract only validated data
    const { username, email, password } = value;

    // Check if email already exists
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already taken",
      });
    }

    // Generate wallet address for the user
    const walletAddress = generateWalletAddress();

    // Create user (password will be hashed automatically by model hook)
    const user = await User.create({
      username,
      email,
      password,
      walletAddress,
      balance: parseFloat(process.env.DEFAULT_WALLET_BALANCE) || 10000,
      isActive: true,
    });

    // Generate JWT token
    const token = generateToken(user.id);

    logger.info(`New user registered: ${email}`);
    // Respond with safe user data (no sensitive fields)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          walletAddress: user.walletAddress,
          balance: user.balance,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    logger.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Login Controller
 * Authenticate existing user
 */
export const login = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { email, password } = value;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken(user.id);

    logger.info(`User logged in: ${email}`);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          walletAddress: user.walletAddress,
          balance: user.balance,
          lastLogin: user.lastLogin,
        },
        token,
      },
    });
  } catch (error) {
    logger.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Get Current User Profile
 * Requires authentication middleware
 */
export const getProfile = async (req, res) => {
  try {
    // req.user is attached by JWT auth middleware
    const user = req.user;

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          walletAddress: user.walletAddress,
          balance: user.balance,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
        },
      },
    });
  } catch (error) {
    logger.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export default { signup, login, getProfile };
