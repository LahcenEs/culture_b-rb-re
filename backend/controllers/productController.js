// const Product = require('../models/Product'); // Assume you have a Product model

// // Create a new product
// exports.createProduct = async (req, res) => {
//   const { name, description, price,stock } = req.body;
//   const image = req.file?.path;

//   try {
//     const newProduct = new Product({ID, name, description, price, image });
//     await newProduct.save();
//     res.status(201).json({ message: 'Product created successfully', product: newProduct });
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating product', error: err.message });
//   }
// };

// // Update an existing product
// exports.updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price,stock } = req.body;
//   const image = req.file?.path;

//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       { name, description, price, image,stock },
//       { new: true }
//     );
//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json({ message: 'Product updated successfully', product: updatedProduct });
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating product', error: err.message });
//   }
// };

// // Delete a product
// exports.deleteProduct = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     if (!deletedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting product', error: err.message });
//   }
// };
 const Product = require('../models/Product');
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Assuming Product model is already imported
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products', error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product', error });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const image = req.file ? req.file.path : null;

    const newProduct = new Product({ name, description, price, image, stock });
    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const image = req.file ? req.file.path : null;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    if (image) {
      product.image = image;
    }

    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};