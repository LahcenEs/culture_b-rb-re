// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: String }, // Path to the uploaded image
//   stock: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Product', productSchema);



const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required']
  },

  image: { 
    type: String 
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  stock: 
    { type: Number, required: true, default: 0 }
  
});

module.exports = mongoose.model('Product', productSchema);