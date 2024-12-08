

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const adminController = require('../controllers/adminController');
const upload = require('../midddelware/multer'); // Import the Multer configuration
// Route to add a new product with image upload
router.post('/add-product', upload.single('image'), adminController.postAddProduct);

// Routes for product management
router.get('/', adminController.getProducts); // List products

// Show form to add product
router.get('/add-product', adminController.getAddProduct);

// Handle adding product with validation

router.post('/add-product/', adminController.postAddProduct);
 
// Handle deleting product
router.post('/delete/:productId', adminController.postDeleteProduct);

module.exports = router;