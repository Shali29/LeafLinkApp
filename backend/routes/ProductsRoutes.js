import express from 'express';
import productsController from '../controllers/ProductsController.js';

const router = express.Router();

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

export default router;
