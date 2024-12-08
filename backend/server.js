const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

const productRoutes = require('./routes/product');
const cartRoutes = require ('./routes/cart')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order'); // Admin routes for product management
const path = require('path');
const commentRoutes = require('./routes/commentRoutes');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Set up EJS for rendering views

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing form data

// Routes
app.use('/product', productRoutes);
app.use('/carts', cartRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/uploads/images', express.static('uploads'));
app.use ('/api/comments/${id}',commentRoutes)
// Handle 404 for unknown routes
app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});