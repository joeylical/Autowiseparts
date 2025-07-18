// server/routes/orders.js
const express = require('express');
const router = express.Router();
const orders = require('../models/Order');
const products = require('../models/Product'); // Import products model

router.get('/', (req, res) => {
  const { userId } = req.query;
  if (userId) {
    const userOrders = orders.filter(order => order.userId === userId);
    res.json(userOrders);
  } else {
    console.log('Backend GET /orders response:', orders);
    res.json(orders);
  }
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
  const { items, totalAmount, shippingAddress, paymentInfo } = req.body;

  // Check inventory before processing payment
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    if (!product || product.inventory < item.quantity) {
      return res.status(400).json({ success: false, message: `Not enough stock for ${item.name}` });
    }
  }

  // Simulate payment processing
  const paymentSuccess = Math.random() < 0.8; // 80% success rate

  if (paymentSuccess) {
    // Decrement inventory
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      product.inventory -= item.quantity;
    }

    const newOrder = {
      id: orders.length + 1,
      userId: req.user ? req.user.id : 'guest', // Assuming user is authenticated, otherwise guest
      items,
      totalAmount,
      shippingAddress,
      paymentStatus: 'paid',
      orderStatus: 'pending',
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    res.status(201).json({ success: true, order: newOrder, message: 'Order placed successfully' });
    console.log('Order API response:', newOrder);
  } else {
    res.status(400).json({ success: false, message: 'Payment failed. Please try again.' });
  }
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
