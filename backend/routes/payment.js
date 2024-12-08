const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Create a new payment
router.post('/', paymentController.createPayment);

// Get all payments
router.get('/', paymentController.getAllPayments);

// Get a single payment by ID
router.get('/:id', paymentController.getPaymentById);

// Update a payment status
router.put('/:id/status', paymentController.updatePaymentStatus);

// Delete a payment
router.delete('/:id', paymentController.deletePayment);

module.exports = router;