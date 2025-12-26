import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();// Already called in server.js

/**
 * Sequelize PostgreSQL instance
 *
 * This is the SINGLE source of truth for all database connections.
 * Every model, query, and transaction in MasterKey uses this instance.
 */
const sequelize = new Sequelize({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DATABASE || 'masterkey',
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD,

  // Specify database type
  dialect: 'postgres',
  
 /**
   * Connection pooling
   * Controls how many simultaneous connections Sequelize can open.
   * This protects the database from being overwhelmed under load.
   */
  pool: {
    max: 10,   // Maximum number of connections
    min: 0,    // Minimum number of connections
    acquire: 30000,  // Max time (ms) to get a connection before throwing error
    idle: 10000   // Time (ms) before an idle connection is released
  },
  
   /**
   * Logging
   * Routed through the app's logger so it can be enabled/disabled centrally.
   */
  logging: (msg) => logger.debug(msg),
  
  /**
   * SSL configuration
   * - Disabled in development
   * - Enabled in production for secure database communication
   */
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  
  /**
   * Global model defaults
   * - Automatically adds created_at and updated_at timestamps
   * - Uses snake_case column names instead of camelCase
   */
  define: {
    timestamps: true,
    underscored: true
  }
});

/**
 * Test database connection
 */
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('✅ PostgreSQL connection established successfully');
    return true;
  } catch (error) {
    logger.error('❌ Unable to connect to PostgreSQL database:', error.message);
    throw error;
  }
};

/**
 * Sync database models
 * @param {boolean} force - If true, drops existing tables
 */
export const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force, alter: !force });
    logger.info(`✅ Database synced successfully ${force ? '(tables recreated)' : '(existing tables preserved)'}`);
  } catch (error) {
    logger.error('❌ Database sync failed:', error.message);
    throw error;
  }
};

// Export the sequelize instance so models and services can use it
export default sequelize;
