import express from 'express';
import { getAllSuppliers } from '../controllers/SupplierController';
import { getSupplierById } from '../controllers/SupplierController';
import { createSupplier } from '../controllers/SupplierController';
import { updateSupplier } from '../controllers/SupplierController'; 
import { deleteSupplier } from '../controllers/SupplierController';
import {loginSupplier} from '../controllers/SupplierController';

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
