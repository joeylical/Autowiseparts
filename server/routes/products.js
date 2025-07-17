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

// Get a specific product by ID (simulated)
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
