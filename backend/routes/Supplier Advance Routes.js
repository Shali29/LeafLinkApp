const express = require('express');
const router = express.Router();
const supplierAdvanceController = require('../controllers/supplierAdvanceController');

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

module.exports = router;