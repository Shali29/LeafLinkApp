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
router.get('/:AllAdvances', getAllAdvances);

// GET advances by supplier ID
router.get('/:AdvancesBySupplier', getAdvancesBySupplier);

// GET advance by ID
router.get('/:AdvanceById', getAdvanceById);

// POST create new advance
router.post('/:createAdvance', createAdvance);

// PUT update advance
router.put('/:updateAdvance', updateAdvance);

// DELETE advance
router.delete('/:deleteAdvance', deleteAdvance);

// PUT update advance status
router.put('/:updateAdvanceStatus', updateAdvanceStatus);

// GET advance statistics
router.get('/:AdvanceStatistics', getAdvanceStatistics);

export default router;
