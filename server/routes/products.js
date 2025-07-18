// server/routes/products.js
const express = require('express');
const router = express.Router();
const products = require('../models/Product');

// Get all products with optional search and filtering
router.get('/', (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;
  let filteredProducts = [...products]; // Create a mutable copy

  if (q) {
    const searchTerm = q.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(p =>
      p.price >= parseFloat(minPrice)
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p =>
      p.price <= parseFloat(maxPrice)
    );
  }

  res.json(filteredProducts);
  console.log('Products API response:', filteredProducts);
});

const reviews = require('../models/Review');

// Get a specific product by ID (simulated)
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product) {
    const productReviews = reviews.filter(r => r.productId === productId);
    const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
    const calculatedRating = productReviews.length > 0 ? totalRating / productReviews.length : 0;
    res.json({ ...product, reviews: productReviews, rating: calculatedRating });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
