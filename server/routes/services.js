const express = require('express');
const Service = require('../models/Service');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/services
// @desc    Get all active services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error('Fetch services error:', err);
    res.status(500).json({ message: 'Error retrieving artwork services.' });
  }
});

// @route   GET /api/services/:id
// @desc    Get service details by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found.' });
    }
    res.json(service);
  } catch (err) {
    console.error('Fetch service detail error:', err);
    res.status(500).json({ message: 'Error retrieving service details.' });
  }
});

// @route   POST /api/services
// @desc    Add a new service (Admin Only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, category, description, prices, features, imageUrl } = req.body;

  try {
    if (!name || !category || !description || !prices) {
      return res.status(400).json({ message: 'Please enter all required service fields.' });
    }

    const newService = await Service.create({
      name,
      category,
      description,
      prices,
      features,
      imageUrl
    });

    res.status(201).json(newService);
  } catch (err) {
    console.error('Create service error:', err);
    res.status(500).json({ message: 'Error creating new service.' });
  }
});

module.exports = router;
