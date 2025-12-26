import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import logger from "../utils/logger.js";

dotenv.config();

/**
 * Authentication Middleware (STRICT)
 * ---------------------------------
 * Verifies JWT token, validates user existence and status,
 * and attaches authenticated user data to the request.
 *
 * Requests without a valid token are rejected.
 */
export const authenticate = async (req, res, next) => {
  try {
    /**
     * Extract Authorization header
     * Expected format: "Bearer <token>"
     */
    const authHeader = req.headers.authorization;

    // Reject requests without proper Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please provide a valid token.",
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing",
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired. Please login again.",
        });
      }

      // Handle invalid or tampered token
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token. Please login again.",
        });
      }

      throw error;
    }

    /**
     * Fetch user associated with token
     * Database is the source of truth
     */
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Token may be invalid.",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
      });
    }

        /**
     * Attach authenticated user to request
     * Downstream controllers can now trust req.user
     */
    req.user = user;
    req.userId = user.id;

    logger.debug(`User authenticated: ${user.email}`);

    next();
  } catch (error) {
    logger.error("Authentication error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Authentication Middleware (OPTIONAL)
 * -----------------------------------
 * Attempts to authenticate user if token is present,
 * but does NOT block the request if authentication fails.
 *
 * Useful for public endpoints with optional personalization.
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.substring(7);

    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.userId);

      if (user && user.isActive) {
        req.user = user;
        req.userId = user.id;
      }
    } catch (error) {
      // Silently fail for optional auth
      logger.debug("Optional auth failed:", error.message);
    }

    next();
  } catch (error) {
    logger.error("Optional authentication error:", error);
    next();
  }
};

export default { authenticate, optionalAuth };
