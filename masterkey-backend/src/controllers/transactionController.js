import Joi from 'joi';
import Transaction from '../models/transactionModel.js';
import User from '../models/userModel.js';
import * as engineService from '../services/engineService.js';
import logger from '../utils/logger.js';
import sequelize from '../config/postgres.js';

/**
 * Validation Schemas
 */
const sendTransactionSchema = Joi.object({
  receiverIdentifier: Joi.string().required(),
  amount: Joi.number().positive().required(),
  routeKey: Joi.string().optional() // Optional: allow manual route selection
});

/**
 * Generate unique transaction ID
 * @returns {string} - Transaction ID
 */
const generateTransactionId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `TXN-${timestamp}-${random}`;
};

/**
 * Send Transaction
 * Create and process a new transaction
 */
export const sendTransaction = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    // Validate request
    const { error, value } = sendTransactionSchema.validate(req.body);
    
    if (error) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }
    
    const { receiverIdentifier, amount, routeKey } = value;
    const senderId = req.userId;
    
    // Validate transaction
    const validation = engineService.validateTransaction(amount, receiverIdentifier);
    if (!validation.isValid) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Transaction validation failed',
        errors: validation.errors
      });
    }
    
    // Get sender with lock to prevent race conditions
    const sender = await User.findByPk(senderId, {
      lock: transaction.LOCK.UPDATE,
      transaction
    });
    
    // Select payment route
    let selectedRoute;
    if (routeKey) {
      // Manual route selection
      const availableRoutes = engineService.getAvailableRoutes(amount);
      selectedRoute = availableRoutes.find(r => r.routeKey === routeKey);
      
      if (!selectedRoute) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: `Route ${routeKey} is not available for amount $${amount}`
        });
      }
    } else {
      // Automatic cheapest route selection
      try {
        selectedRoute = engineService.selectCheapestRoute(amount);
      } catch (error) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
    }
    
    const { fee, totalAmount, routeKey: finalRouteKey } = selectedRoute;
    
    // Check sender balance
    if (sender.balance < totalAmount) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: `Insufficient balance. Required: $${totalAmount.toFixed(2)}, Available: $${sender.balance.toFixed(2)}`
      });
    }
    
    // Get all available routes for metadata
    const allRoutes = engineService.getAvailableRoutes(amount);
    
    // Create transaction record
    const newTransaction = await Transaction.create({
      transactionId: generateTransactionId(),
      senderId: sender.id,
      receiverIdentifier,
      amount,
      fee,
      totalAmount,
      route: finalRouteKey,
      status: 'SUCCESS',
      routeMetadata: {
        routeName: selectedRoute.name,
        processingTime: selectedRoute.processingTime,
        description: selectedRoute.description,
        allAvailableRoutes: allRoutes
      }
    }, { transaction });
    
    // Deduct amount from sender
    sender.balance -= totalAmount;
    await sender.save({ transaction });
    
    // Commit transaction
    await transaction.commit();
    
    logger.info(`Transaction created: ${newTransaction.transactionId} from ${sender.email} to ${receiverIdentifier}`);
    
    res.status(201).json({
      success: true,
      message: 'Transaction processed successfully',
      data: {
        id: newTransaction.id,
        transactionId: newTransaction.transactionId,
        amount: newTransaction.amount,
        fee: newTransaction.fee,
        totalAmount: newTransaction.totalAmount,
        route: newTransaction.route,
        status: newTransaction.status,
        receiverIdentifier: newTransaction.receiverIdentifier,
        routeMetadata: newTransaction.routeMetadata,
        createdAt: newTransaction.createdAt,
        newBalance: sender.balance
      }
    });
  } catch (error) {
    await transaction.rollback();
    logger.error('Send transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process transaction',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get Transaction by ID
 * Retrieve transaction details
 */
export const getTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const userId = req.userId;
    
    // Find transaction
    const transaction = await Transaction.findOne({
      where: { transactionId },
      include: [{
        model: User,
        as: 'sender',
        attributes: ['id', 'username', 'email', 'walletAddress']
      }]
    });
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    // Check authorization (only sender can view)
    if (transaction.senderId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this transaction'
      });
    }
    
    res.status(200).json({
      success: true,
      data: { transaction }
    });
  } catch (error) {
    logger.error('Get transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get Transaction History
 * Retrieve user's transaction history with pagination
 */
export const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const offset = (page - 1) * limit;
    
    // Build query
    const where = { senderId: userId };
    if (status) {
      where.status = status;
    }
    
    // Get transactions
    const { count, rows: transactions } = await Transaction.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        as: 'sender',
        attributes: ['id', 'username', 'email', 'walletAddress']
      }]
    });
    
    const totalPages = Math.ceil(count / limit);
    
    res.status(200).json({
      success: true,
      data: {
        transactions,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: count,
          itemsPerPage: limit,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    logger.error('Get transaction history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction history',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get Transaction Statistics
 * Get user's transaction statistics
 */
export const getTransactionStats = async (req, res) => {
  try {
    const userId = req.userId;
    
    const stats = await Transaction.findAll({
      where: { senderId: userId },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalTransactions'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount'],
        [sequelize.fn('SUM', sequelize.col('fee')), 'totalFees'],
        [sequelize.fn('AVG', sequelize.col('amount')), 'avgAmount']
      ],
      raw: true
    });
    
    res.status(200).json({
      success: true,
      data: {
        stats: stats[0]
      }
    });
  } catch (error) {
    logger.error('Get transaction stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  sendTransaction,
  getTransaction,
  getTransactionHistory,
  getTransactionStats
};
