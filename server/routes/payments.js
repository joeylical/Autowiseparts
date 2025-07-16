// server/routes/payments.js
const express = require('express');
const router = express.Router();

// Simulate payment processing
router.post('/process', (req, res) => {
  // Simulate payment success or failure
  const success = Math.random() < 0.8; // 80% success rate
  if (success) {
    res.json({ success: true, message: 'Payment successful' });
  } else {
    res.status(400).json({ success: false, message: 'Payment failed' });
  }
});

module.exports = router;
