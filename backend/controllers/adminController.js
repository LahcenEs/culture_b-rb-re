// controllers/adminController.js

const Product = require('../models/Product'); // Assuming a Product model is already set up

// Display all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('../views/products', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Show form to add a product
exports.getAddProduct = (req, res) => {
    res.render('../views/addProduct.ejs');
};

// Handle adding a product
exports.postAddProduct = async (req, res) => {
    const { name, description, price, stock} = req.body;
    const image = req.file ? req.file.path : ''; // Get the file path if uploaded
  
    const product = new Product({
      name,
      description,
      price,
      stock, // Make sure this field is handled properly
      image,
    });
  
    try {
      await product.save();
      res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

// Show form to edit a product
exports.getEditProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        res.render('../views/editProduct.ejs', { product });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Handle editing a product
exports.postEditProduct = async (req, res) => {
    const productId = req.params.productId;
    const { name, description, price, image } = req.body;
    try {
        await Product.findByIdAndUpdate(productId, { ID, name, description, price, image });
        res.redirect('../views/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Handle deleting a product
exports.postDeleteProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        await Product.findByIdAndDelete(productId);
        res.redirect('../views/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};