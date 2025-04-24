const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// GET all products
router.get('/', productsController.getAllProducts);

// GET product by ID
router.get('/:id', productsController.getProductById);

// POST create new product
router.post('/', productsController.createProduct);

// PUT update product
router.put('/:id', productsController.updateProduct);

// DELETE product
router.delete('/:id', productsController.deleteProduct);

// PUT update product stock
router.put('/:id/stock', productsController.updateProductStock);

module.exports = router;