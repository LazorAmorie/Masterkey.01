import express from 'express';
import * as transactionController from '../controllers/transactionController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// All transaction routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/transaction/send
 * @desc    Create and process a new transaction
 * @access  Private
 */
router.post('/send', transactionController.sendTransaction);

/**
 * @route   GET /api/transaction/history
 * @desc    Get user's transaction history with pagination
 * @access  Private
 */
router.get('/history', transactionController.getTransactionHistory);

/**
 * @route   GET /api/transaction/stats
 * @desc    Get user's transaction statistics
 * @access  Private
 */
router.get('/stats', transactionController.getTransactionStats);

/**
 * @route   GET /api/transaction/:transactionId
 * @desc    Get specific transaction details
 * @access  Private
 */
router.get('/:transactionId', transactionController.getTransaction);

export default router;
