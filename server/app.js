// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const reviewsRoutes = require('./routes/reviews');
const paymentsRoutes = require('./routes/payments');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/payments', paymentsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

