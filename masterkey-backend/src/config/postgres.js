import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

/**
 * Sequelize PostgreSQL Database Connection
 * Configured with connection pooling and logging
 */
const sequelize = new Sequelize({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DATABASE || 'masterkey',
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  
  // Connection pool configuration
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  
  // Logging
  logging: (msg) => logger.debug(msg),
  
  // Disable string operators for security
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  
  // Timestamps
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

export default sequelize;
