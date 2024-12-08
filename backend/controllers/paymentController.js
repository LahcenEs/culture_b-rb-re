const Payment = require('../models/Payment');

// Create a new payment
exports.createPayment = async (req, res) => {
  const { user, order, amount, method } = req.body;

  try {
    const payment = new Payment({
      user,
      order,
      amount,
      method,
    });

    await payment.save();

    res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (err) {
    res.status(500).json({ message: 'Error creating payment', error: err.message });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('user').populate('order');
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payments', error: err.message });
  }
};

// Get a single payment by ID
exports.getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id).populate('user').populate('order');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payment', error: err.message });
  }
};

// Update a payment status
exports.updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const payment = await Payment.findByIdAndUpdate(id, { status }, { new: true });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment updated successfully', payment });
  } catch (err) {
    res.status(500).json({ message: 'Error updating payment', error: err.message });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting payment', error: err.message });
  }
};