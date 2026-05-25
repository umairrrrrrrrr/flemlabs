const mongoose = require('mongoose');
const { getModel } = require('../config/db');

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  },
  customerId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Card', 'Crypto'],
    required: true
  },
  cardLast4: {
    type: String
  },
  txHash: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = getModel('Payment', PaymentSchema);
