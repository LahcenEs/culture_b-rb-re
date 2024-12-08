// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const productController = require('../controllers/productController');

// const router = express.Router();

// // Set up Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// // File filter to accept only images
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only images are allowed!'), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// // Create Product with image upload
// router.post('/', upload.single('image'), productController.createProduct);

// // Modify (Update) Product with image upload
// router.put('/:id', upload.single('image'), productController.updateProduct);

// // Delete Product
// router.delete('/:id', productController.deleteProduct);

// module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController'); // Ensure correct path

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Create Product with image upload
router.post('/views/products', upload.single('image'), productController.createProduct);

// Get All Products
router.get('/views/addProduct', productController.getAllProducts);

// Get a Single Product by ID
router.get('/views/addProduct/:id', productController.getProductById);

// Modify (Update) Product with image upload
router.put('/:id', upload.single('image'), productController.updateProduct);

// Delete Product
router.delete('/:id', productController.deleteProduct);

module.exports = router;