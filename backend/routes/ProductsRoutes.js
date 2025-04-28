import express from 'express';
import {getAllProducts } from '../controllers/ProductsController.js';
import {getProductById} from '../controllers/ProductsController.js';
import {createProduct } from '../controllers/ProductsController.js';
import {updateProduct } from '../controllers/ProductsController.js';
import {deleteProduct } from '../controllers/ProductsController.js';
import {updateProductStock } from '../controllers/ProductsController.js';

const router = express.Router();

// GET all products
router.get('/:AllProducts', getAllProducts);

// GET product by ID
router.get('/:ProductById', getProductById);

// POST create new product
router.post('/:createProduct', createProduct);

// PUT update product
router.put('/:updateProduct', updateProduct);

// DELETE product
router.delete('/:deleteProduct', deleteProduct);

// PUT update product stock
router.put('/:updateProductStock', updateProductStock);

export default router;
