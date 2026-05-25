const mongoose = require('mongoose');
const { getModel } = require('../config/db');

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  prices: {
    basic: { type: Number, required: true },
    standard: { type: Number, required: true },
    pro: { type: Number, required: true }
  },
  features: {
    basic: [String],
    standard: [String],
    pro: [String]
  },
  imageUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = getModel('Service', ServiceSchema);
