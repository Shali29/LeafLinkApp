import express from 'express';
import {getAllProducts } from '../controllers/ProductsController.js';
import {getProductById} from '../controllers/ProductsController.js';
import {createProduct } from '../controllers/ProductsController.js';
import {updateProduct } from '../controllers/ProductsController.js';
import {deleteProduct } from '../controllers/ProductsController.js';
import {updateProductStock } from '../controllers/ProductsController.js';

const router = express.Router();

// GET all products
router.get('/', getAllProducts);

// GET product by ID
router.get('/:id', getProductById);

// POST create new product
router.post('/', createProduct);

// PUT update product
router.put('/:id', updateProduct);

// DELETE product
router.delete('/:id', deleteProduct);

// PUT update product stock
router.put('/:id/stock', updateProductStock);

export default router;
