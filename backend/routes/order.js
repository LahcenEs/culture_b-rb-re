const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

// Get a single order by ID
router.get('/:id', orderController.getOrderById);

// Update an order status
router.put('/:id/status', orderController.updateOrderStatus);

// Delete an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;