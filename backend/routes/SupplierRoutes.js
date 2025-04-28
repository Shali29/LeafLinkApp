import express from 'express';
import { getAllSuppliers } from '../controllers/SupplierController';
import { getSupplierById } from '../controllers/SupplierController';
import { createSupplier } from '../controllers/SupplierController';
import { updateSupplier } from '../controllers/SupplierController'; 
import { deleteSupplier } from '../controllers/SupplierController';
import {loginSupplier} from '../controllers/SupplierController';

const router = express.Router();

// GET all suppliers
router.get('/', getAllSuppliers);

// GET supplier by ID
router.get('/:id', getSupplierById);

// POST create new supplier
router.post('/', createSupplier);

// PUT update supplier
router.put('/:id', updateSupplier);

// DELETE supplier
router.delete('/:id', deleteSupplier);

// POST login supplier
router.post('/login', loginSupplier);

export default router;
