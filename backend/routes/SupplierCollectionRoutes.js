import express from 'express';
import { getAllCollections } from '../controllers/SupplierCollectionController.js';
import { getCollectionsBySupplier } from '../controllers/SupplierCollectionController.js';
import { getCollectionById } from '../controllers/SupplierCollectionController.js';
import { createCollection } from '../controllers/SupplierCollectionController.js';
import { updateCollection } from '../controllers/SupplierCollectionController.js';
import { deleteCollection } from '../controllers/SupplierCollectionController.js';
import { getCollectionStatistics } from '../controllers/SupplierCollectionController.js';

const router = express.Router();

// GET all collections
router.get('/:AllCollections', getAllCollections);

// GET collections by supplier ID
router.get('/:CollectionsBySupplier', getCollectionsBySupplier);

// GET collection by ID
router.get('/:CollectionById', getCollectionById);

// POST create new collection
router.post('/:createCollection', createCollection);

// PUT update collection
router.put('/:updateCollection', updateCollection);

// DELETE collection
router.delete('/:deleteCollection', deleteCollection);

// GET collection statistics
router.get('/:CollectionStatistics', getCollectionStatistics);

export default router;
