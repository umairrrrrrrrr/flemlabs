const express = require('express');
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/payments
// @desc    Log a new credit card or MetaMask cryptocurrency payment transaction
router.post('/', authMiddleware, async (req, res) => {
  const { orderId, amount, paymentMethod, cardLast4, txHash } = req.body;

  try {
    if (!orderId || !amount || !paymentMethod) {
      return res.status(400).json({ message: 'Missing transaction details.' });
    }

    // Verify order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Associated order not found.' });
    }

    // Create payment entry
    const newPayment = await Payment.create({
      orderId,
      customerId: req.user.id,
      amount,
      paymentMethod,
      cardLast4: paymentMethod === 'Card' ? cardLast4 || '0000' : undefined,
      txHash: paymentMethod === 'Crypto' ? txHash || '0x...' : undefined,
      status: 'Paid'
    });

    // Update order payment status
    await Order.findByIdAndUpdate(orderId, { paymentStatus: 'Paid' });

    res.status(201).json(newPayment);
  } catch (err) {
    console.error('Record payment error:', err);
    res.status(500).json({ message: 'Error recording transaction data.' });
  }
});

// @route   GET /api/payments
// @desc    Get all transactions (Admin Only)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    console.error('Fetch payments error:', err);
    res.status(500).json({ message: 'Error retrieving payment database records.' });
  }
});

module.exports = router;
