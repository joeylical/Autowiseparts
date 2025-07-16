// server/routes/orders.js
const express = require('express');
const router = express.Router();
const orders = require('../models/Order');

// Get all orders (simulated)
router.get('/', (req, res) => {
  res.json(orders);
});

// Get a specific order by ID (simulated)
router.get('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Create a new order (simulated)
router.post('/', (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    ...req.body,
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Update an existing order (simulated)
router.put('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const orderIndex = orders.findIndex((o) => o.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex] = { ...orders[orderIndex], ...req.body };
    res.json(orders[orderIndex]);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Delete an order (simulated)
router.delete('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const orderIndex = orders.findIndex((o) => o.id === orderId);
  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

module.exports = router;