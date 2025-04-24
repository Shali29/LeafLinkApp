const express = require('express');
const router = express.Router();
const supplierCollectionController = require('../controllers/supplierCollectionController');

// GET all collections
router.get('/', supplierCollectionController.getAllCollections);

// GET collections by supplier ID
router.get('/supplier/:supplierId', supplierCollectionController.getCollectionsBySupplier);

// GET collection by ID
router.get('/:id', supplierCollectionController.getCollectionById);

// POST create new collection
router.post('/', supplierCollectionController.createCollection);

// PUT update collection
router.put('/:id', supplierCollectionController.updateCollection);

// DELETE collection
router.delete('/:id', supplierCollectionController.deleteCollection);

// GET collection statistics
router.get('/stats/summary', supplierCollectionController.getCollectionStatistics);

module.exports = router;