/**
 * Transaction Engine Service
 * Handles payment route selection and fee calculation
 */

// Payment routes with their configurations
const PAYMENT_ROUTES = {
  MOBILE_WALLET: {
    name: 'Mobile Wallet',
    baseFee: 10,
    percentageFee: 0.01, // 1%
    minAmount: 1,
    maxAmount: 50000,
    processingTime: 'instant',
    description: 'Fast mobile wallet transfer'
  },
  BANK_TRANSFER: {
    name: 'Bank Transfer',
    baseFee: 25,
    percentageFee: 0.005, // 0.5%
    minAmount: 100,
    maxAmount: 1000000,
    processingTime: '1-3 business days',
    description: 'Traditional bank transfer'
  },
  CARD_PAYMENT: {
    name: 'Card Payment',
    baseFee: 15,
    percentageFee: 0.025, // 2.5%
    minAmount: 5,
    maxAmount: 100000,
    processingTime: 'instant',
    description: 'Credit/Debit card payment'
  },
  CRYPTO_TRANSFER: {
    name: 'Crypto Transfer',
    baseFee: 5,
    percentageFee: 0.002, // 0.2%
    minAmount: 10,
    maxAmount: 500000,
    processingTime: '10-30 minutes',
    description: 'Blockchain-based cryptocurrency transfer'
  }
};

/**
 * Calculate fee for a specific payment route
 * @param {string} routeName - Name of the payment route
 * @param {number} amount - Transaction amount
 * @returns {number} - Calculated fee
 */
export const calculateFee = (routeName, amount) => {
  const route = PAYMENT_ROUTES[routeName];
  if (!route) {
    throw new Error(`Invalid payment route: ${routeName}`);
  }
  
  return route.baseFee + (amount * route.percentageFee);
};

/**
 * Get all available routes for a given amount
 * @param {number} amount - Transaction amount
 * @returns {Array} - Array of available routes with fees
 */
export const getAvailableRoutes = (amount) => {
  const availableRoutes = [];
  
  for (const [key, route] of Object.entries(PAYMENT_ROUTES)) {
    if (amount >= route.minAmount && amount <= route.maxAmount) {
      const fee = calculateFee(key, amount);
      availableRoutes.push({
        routeKey: key,
        name: route.name,
        fee: fee,
        totalAmount: amount + fee,
        processingTime: route.processingTime,
        description: route.description
      });
    }
  }
  
  // Sort by fee (cheapest first)
  availableRoutes.sort((a, b) => a.fee - b.fee);
  
  return availableRoutes;
};

/**
 * Select the cheapest payment route for a transaction
 * @param {number} amount - Transaction amount
 * @returns {Object} - Selected route information
 */
export const selectCheapestRoute = (amount) => {
  const availableRoutes = getAvailableRoutes(amount);
  
  if (availableRoutes.length === 0) {
    throw new Error(`No payment routes available for amount: $${amount}`);
  }
  
  // Return the first route (cheapest due to sorting)
  return availableRoutes[0];
};

/**
 * Validate transaction details
 * @param {number} amount - Transaction amount
 * @param {string} receiverIdentifier - Receiver identifier
 * @returns {Object} - Validation result
 */
export const validateTransaction = (amount, receiverIdentifier) => {
  const errors = [];
  
  // Validate amount
  if (!amount || amount <= 0) {
    errors.push('Amount must be greater than 0');
  }
  
  // Validate receiver
  if (!receiverIdentifier || receiverIdentifier.trim() === '') {
    errors.push('Receiver identifier is required');
  }
  
  // Check if any routes are available
  const availableRoutes = getAvailableRoutes(amount);
  if (availableRoutes.length === 0) {
    errors.push(`Amount $${amount} is outside the range of all available payment routes`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Get route details by key
 * @param {string} routeKey - Route key
 * @returns {Object} - Route configuration
 */
export const getRouteDetails = (routeKey) => {
  return PAYMENT_ROUTES[routeKey] || null;
};

export default {
  calculateFee,
  getAvailableRoutes,
  selectCheapestRoute,
  validateTransaction,
  getRouteDetails,
  PAYMENT_ROUTES
};
