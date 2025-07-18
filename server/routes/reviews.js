// server/routes/reviews.js
const express = require('express');
const router = express.Router();
const reviews = require('../models/Review');
const products = require('../models/Product');

// Get reviews for a specific product
router.get('/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const productReviews = reviews.filter(r => r.productId === productId);
  res.json(productReviews);
});

// Create a new review for a product
router.post('/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const newReview = {
    id: reviews.length + 1,
    productId,
    ...req.body,
  };

  reviews.push(newReview);

  // Update product rating
  const productReviews = reviews.filter(r => r.productId === productId);
  const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
  product.rating = totalRating / productReviews.length;

  res.status(201).json(newReview);
});

module.exports = router;