import express from 'express';
import supplierController from '../controllers/SupplierController.js';

const router = express.Router();

// GET all suppliers
router.get('/', supplierController.getAllSuppliers);

// GET supplier by ID
router.get('/:id', supplierController.getSupplierById);

// POST create new supplier
router.post('/', supplierController.createSupplier);

// PUT update supplier
router.put('/:id', supplierController.updateSupplier);

// DELETE supplier
router.delete('/:id', supplierController.deleteSupplier);

// POST login supplier
router.post('/login', supplierController.loginSupplier);

export default router;
