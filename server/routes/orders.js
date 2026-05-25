const express = require('express');
const Order = require('../models/Order');
const Service = require('../models/Service');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Place a new artwork order
router.post('/', authMiddleware, async (req, res) => {
  const { serviceId, tier, requirements, referenceImage, price, paymentMethod } = req.body;

  try {
    if (!serviceId || !tier || !requirements || !price || !paymentMethod) {
      return res.status(400).json({ message: 'Please provide all details to place the order.' });
    }

    // Lookup service to verify name
    const service = await Service.findById(serviceId);
    const serviceName = service ? service.name : 'Custom Digital Art';

    // Create the order
    const newOrder = await Order.create({
      customerId: req.user.id,
      customerName: req.user.name,
      serviceId,
      serviceName,
      tier,
      requirements,
      referenceImage,
      price,
      paymentMethod,
      paymentStatus: 'Paid', // Dummy payment always succeeds in this mode!
      status: 'Pending'
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ message: 'Error processing order placement.' });
  }
});

// @route   GET /api/orders
// @desc    Get user orders (Admins retrieve all orders)
router.get('/', authMiddleware, async (req, res) => {
  try {
    let orders;
    if (req.user.role === 'admin') {
      orders = await Order.find();
    } else {
      orders = await Order.find({ customerId: req.user.id });
    }
    res.json(orders);
  } catch (err) {
    console.error('Fetch orders error:', err);
    res.status(500).json({ message: 'Error retrieving order records.' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin Only)
router.put('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  const { status } = req.body;

  try {
    const validStatuses = ['Pending', 'Accepted', 'In Progress', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status value.' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order record not found.' });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ message: 'Error updating order status.' });
  }
});

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel an order (Customer can cancel if Pending/Accepted, Admin can cancel anytime)
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  const { cancellationReason } = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order record not found.' });
    }

    // Shield check: Customer can only cancel their own orders
    if (req.user.role !== 'admin' && order.customerId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized. You cannot cancel another user\'s order.' });
    }

    // Customer status check
    if (req.user.role !== 'admin' && !['Pending', 'Accepted'].includes(order.status)) {
      return res.status(400).json({ 
        message: 'This order is already in progress or completed and cannot be cancelled automatically. Please contact support.' 
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'Cancelled',
        cancellationReason: cancellationReason || 'Cancelled by user.'
      },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (err) {
    console.error('Cancel order error:', err);
    res.status(500).json({ message: 'Error cancelling the order.' });
  }
});

module.exports = router;
