import express from 'express';
import {getAllAdvances} from '../controllers/SupplierAdvanceController.js';
import {getAdvancesBySupplier} from '../controllers/SupplierAdvanceController.js';
import {getAdvanceById} from '../controllers/SupplierAdvanceController.js';
import { createAdvance } from '../controllers/SupplierAdvanceController.js';
import { updateAdvance } from '../controllers/SupplierAdvanceController.js';
import { deleteAdvance } from '../controllers/SupplierAdvanceController.js';
import { updateAdvanceStatus } from '../controllers/SupplierAdvanceController.js';
import { getAdvanceStatistics } from '../controllers/SupplierAdvanceController.js';
const router = express.Router();

// GET all advances
router.get('/', getAllAdvances);

// GET advances by supplier ID
router.get('/supplier/:supplierId', getAdvancesBySupplier);

// GET advance by ID
router.get('/:id', getAdvanceById);

// POST create new advance
router.post('/', createAdvance);

// PUT update advance
router.put('/:id', updateAdvance);

// DELETE advance
router.delete('/:id', deleteAdvance);

// PUT update advance status
router.put('/:id/status', updateAdvanceStatus);

// GET advance statistics
router.get('/stats/summary', getAdvanceStatistics);

export default router;
