const mongoose = require('mongoose');
const User = require('./User'); // Assuming the User model is defined in this file

// Admin Schema
const adminSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  role: {
    type: String,
    default: 'admin'
  }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);


