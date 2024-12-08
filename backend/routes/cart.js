const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

// Add product to cart
router.post('/cart', cartController.addToCart);

// Get cart for a specific user
router.get('/cart/:userId', cartController.getCartByUser);

// Update product quantity in the cart
router.put('/cart', cartController.updateCart);

// Remove product from cart
router.delete('/cart', cartController.removeFromCart);

module.exports = router;