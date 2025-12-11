import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize, { testConnection, syncDatabase } from './src/config/postgres.js';
import logger from './src/utils/logger.js';

// Import routes
import authRoutes from './src/routes/auth.js';
import transactionRoutes from './src/routes/transaction.js';

// Import models to ensure they're loaded
import './src/models/userModel.js';
import './src/models/transactionModel.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Middleware Configuration
 */
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

/**
 * Health Check Endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MasterKey Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/transaction', transactionRoutes);

/**
 * Root Endpoint
 */
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to MasterKey Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile'
      },
      transactions: {
        send: 'POST /api/transaction/send',
        history: 'GET /api/transaction/history',
        stats: 'GET /api/transaction/stats',
        details: 'GET /api/transaction/:transactionId'
      }
    }
  });
});

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  logger.error('Unexpected error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

/**
 * Database Connection and Server Start
 */
const startServer = async () => {
  try {
    // Test database connection
    logger.info('Testing database connection...');
    await testConnection();
    
    // Sync database models
    logger.info('Syncing database models...');
    await syncDatabase(false); // Set to true to recreate tables
    
    // Start Express server
    app.listen(PORT, () => {
      logger.info(`🚀 MasterKey Backend running on port ${PORT}`);
      logger.info(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`🔗 API Base URL: http://localhost:${PORT}`);
      logger.info(`💚 Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

/**
 * Graceful Shutdown
 */
const gracefulShutdown = async (signal) => {
  logger.info(`\n${signal} received. Starting graceful shutdown...`);
  
  try {
    // Close database connection
    await sequelize.close();
    logger.info('✅ Database connection closed');
    
    logger.info('✅ Server shutdown complete');
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  }
};

// Listen for termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

// Start the server
startServer();
