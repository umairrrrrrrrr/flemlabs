const express = require('express');
const Review = require('../models/Review');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/reviews
// @desc    Get all reviews / testimonials
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    // Sort reviews by date descending (latest first)
    const sorted = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(sorted);
  } catch (err) {
    console.error('Fetch reviews error:', err);
    res.status(500).json({ message: 'Error retrieving testimonials.' });
  }
});

// @route   POST /api/reviews
// @desc    Submit a new review
router.post('/', authMiddleware, async (req, res) => {
  const { rating, comments } = req.body;

  try {
    if (!rating || !comments) {
      return res.status(400).json({ message: 'Please provide both rating stars and comments.' });
    }

    const score = parseInt(rating);
    if (isNaN(score) || score < 1 || score > 5) {
      return res.status(400).json({ message: 'Rating must be a whole number between 1 and 5.' });
    }

    const newReview = await Review.create({
      userId: req.user.id,
      userName: req.user.name,
      rating: score,
      comments
    });

    res.status(201).json(newReview);
  } catch (err) {
    console.error('Create review error:', err);
    res.status(500).json({ message: 'Error submitting testimonial.' });
  }
});

// @route   PUT /api/reviews/:id
// @desc    Update a review
router.put('/:id', authMiddleware, async (req, res) => {
  const { comments, rating } = req.body;

  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    // Shield check: User can only edit their own reviews unless admin
    if (req.user.role !== 'admin' && review.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied. You cannot edit another user\'s review.' });
    }

    const updates = {};
    if (comments) updates.comments = comments;
    if (rating) {
      const score = parseInt(rating);
      if (score >= 1 && score <= 5) {
        updates.rating = score;
      }
    }

    const updatedReview = await Review.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedReview);
  } catch (err) {
    console.error('Update review error:', err);
    res.status(500).json({ message: 'Error modifying testimonial.' });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    // Shield check: User can only delete their own reviews unless admin
    if (req.user.role !== 'admin' && review.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied. You cannot delete another user\'s review.' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review successfully removed.' });
  } catch (err) {
    console.error('Delete review error:', err);
    res.status(500).json({ message: 'Error deleting testimonial.' });
  }
});

module.exports = router;
