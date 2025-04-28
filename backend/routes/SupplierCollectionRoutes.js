import express from 'express';
import supplierCollectionController from '../controllers/supplierCollectionController.js';
import { getAllCollections } from '../controllers/SupplierCollectionController.js';
import { getCollectionsBySupplier } from '../controllers/SupplierCollectionController.js';
import { getCollectionById } from '../controllers/SupplierCollectionController.js';
import { createCollection } from '../controllers/SupplierCollectionController.js';
import { updateCollection } from '../controllers/SupplierCollectionController.js';
import { deleteCollection } from '../controllers/SupplierCollectionController.js';
import { getCollectionStatistics } from '../controllers/SupplierCollectionController.js';

const router = express.Router();

// GET all collections
router.get('/', getAllCollections);

// GET collections by supplier ID
router.get('/supplier/:supplierId', getCollectionsBySupplier);

// GET collection by ID
router.get('/:id', getCollectionById);

// POST create new collection
router.post('/', createCollection);

// PUT update collection
router.put('/:id', updateCollection);

// DELETE collection
router.delete('/:id', deleteCollection);

// GET collection statistics
router.get('/stats/summary', getCollectionStatistics);

export default router;
