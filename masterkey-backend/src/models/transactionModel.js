import { DataTypes } from 'sequelize';
import sequelize from '../config/postgres.js';
import User from './userModel.js';

/**
 * Transaction Model
 * Represents a financial transaction in the MasterKey system
 */
const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  transactionId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  receiverIdentifier: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Email, phone, or wallet address of receiver'
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  fee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  totalAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  route: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Payment route used (MOBILE_WALLET, BANK_TRANSFER, etc.)'
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'),
    defaultValue: 'PENDING',
    allowNull: false
  },
  routeMetadata: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Additional route-specific metadata'
  }
}, {
  tableName: 'transactions',
  timestamps: true,
  indexes: [
    {
      fields: ['transactionId']
    },
    {
      fields: ['senderId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['createdAt']
    }
  ]
});

/**
 * Define Associations
 */
Transaction.belongsTo(User, {
  foreignKey: 'senderId',
  as: 'sender'
});

User.hasMany(Transaction, {
  foreignKey: 'senderId',
  as: 'transactions'
});

export default Transaction;

