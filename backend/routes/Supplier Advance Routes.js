import express from 'express';
import supplierAdvanceController from '../controllers/supplierAdvanceController.js';

const router = express.Router();

// GET all advances
router.get('/', supplierAdvanceController.getAllAdvances);

// GET advances by supplier ID
router.get('/supplier/:supplierId', supplierAdvanceController.getAdvancesBySupplier);

// GET advance by ID
router.get('/:id', supplierAdvanceController.getAdvanceById);

// POST create new advance
router.post('/', supplierAdvanceController.createAdvance);

// PUT update advance
router.put('/:id', supplierAdvanceController.updateAdvance);

// DELETE advance
router.delete('/:id', supplierAdvanceController.deleteAdvance);

// PUT update advance status
router.put('/:id/status', supplierAdvanceController.updateAdvanceStatus);

// GET advance statistics
router.get('/stats/summary', supplierAdvanceController.getAdvanceStatistics);

export default router;
