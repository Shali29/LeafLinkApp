import express from 'express';
import { getAllSuppliers } from '../controllers/SupplierController.js';
import { getSupplierById } from '../controllers/SupplierController.js';
import { createSupplier } from '../controllers/SupplierController.js';
import { updateSupplier } from '../controllers/SupplierController.js'; 
import { deleteSupplier } from '../controllers/SupplierController.js';
import {loginSupplier} from '../controllers/SupplierController.js';

const router = express.Router();

// GET all suppliers
router.get('/:AllSuppliers', getAllSuppliers);

// GET supplier by ID
router.get('/:SupplierById', getSupplierById);

// POST create new supplier
router.post('/:createSupplier', createSupplier);

// PUT update supplier
router.put('/:updateSupplier', updateSupplier);

// DELETE supplier
router.delete('/:deleteSupplier', deleteSupplier);

// POST login supplier
router.post('/loginSupplier', loginSupplier);

export default router;
